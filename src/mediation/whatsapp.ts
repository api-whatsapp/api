import "dotenv/config";
import fs from "node:fs";
import type { WASocket, SocketConfig } from "@whiskeysockets/baileys";

import {
	Browsers,
	makeWASocket,
	WAMessageUpdate,
	DisconnectReason,
	isJidBroadcast,
	useMultiFileAuthState,
	makeCacheableSignalKeyStore,
} from "@whiskeysockets/baileys";

import { prismaClient } from "../config/database";

import { Boom } from "@hapi/boom";
import { logger } from "../config/logger";
import { gracefulShutdown } from "../main";
import { QRService } from "../services/qrService";
import { MessageService } from "../services/messageService";
import { initStore, Store, useSession } from "baileys-store-pakaiwa";

const auth_dir: string = process.env.AUTH_DIR ?? "auth_data";

const { session } = { session: auth_dir };

const maxRetry = Number(process.env.MAX_RENEW_QR ?? 3);

let retry = 0;

type Session = WASocket & {
	destroy: () => Promise<void>;
	store: Store;
};

type createSessionOptions = {
	session_id: string;
	res?: Response;
	SSE?: boolean;
	readIncomingMessages?: boolean;
	socketConfig?: SocketConfig;
};

const sessions = new Map<string, Session>();
const retries = new Map<string, number>();
const SSEQRGenerations = new Map<string, number>();

const RECONNECT_INTERVAL = Number(process.env.RECONNECT_INTERVAL ?? 0);
const MAX_RECONNECT_RETRIES = Number(process.env.MAX_RECONNECT_RETRIES ?? 5);
const SSE_MAX_QR_GENERATION = Number(process.env.SSE_MAX_QR_GENERATION ?? 5);
const SESSION_CONFIG_ID = "session-config";

export async function init() {
	const sessions = await prismaClient.session.findMany({
		select: { session_id: true, data: true },
		where: { id: { startsWith: SESSION_CONFIG_ID } },
	});

	if (sessions.length > 0) {
		for (const { session_id, data } of sessions) {
			logger.warn(`sessionId ${session_id}, data ${data}`);
			const { readIncomingMessages, ...socketConfig } = JSON.parse(data);
			createSession({ session_id, readIncomingMessages, socketConfig });
		}
	}
}

export async function createSession(options: createSessionOptions) {
	const {
		session_id,
		res,
		SSE = false,
		readIncomingMessages = false,
		socketConfig,
	} = options;

	const { state, saveCreds } = await useSession(session_id);
	const socket = makeWASocket({
		printQRInTerminal: true,
		browser: Browsers.ubuntu("Chrome"),
		generateHighQualityLinkPreview: true,
		...socketConfig,
		auth: {
			creds: state.creds,
			keys: makeCacheableSignalKeyStore(state.keys, logger),
		},
		logger,
		shouldIgnoreJid: (jid) => isJidBroadcast(jid),
		getMessage: async (key) => {
			const data = await prismaClient.message.findFirst({
				where: {
					id: key.id!,
					sessionId: session_id,
					remoteJid: key.remoteJid!,
				},
			});
			return (data?.message || undefined) as proto.IMessage | undefined;
		},
	});

	socket.ev.on("creds.update", saveCreds);
}

export async function waSock(): Promise<WASocket> {
	const { state } = await useMultiFileAuthState(auth_dir);

	return makeWASocket({
		logger,
		generateHighQualityLinkPreview: false,
		linkPreviewImageThumbnailWidth: 0,
		printQRInTerminal: false,
		syncFullHistory: false,
		auth: state,
	});
}

export const isWAConnected = () => {
	// return waSock.user;
	return false;
};

const timedOut = async (reason: number) => {
	logger.warn(`Reason ${reason}, Retry get RQ ${retry} of ${maxRetry}`);

	if (retry <= maxRetry) {
		reconect();
		retry++;
	} else {
		retry = 0;
		try {
			logger.warn("Destroy");
			await Promise.all([waSock.logout()]);
			gracefulShutdown();
		} catch (e) {
			logger.error(e, "An error occured during session destroy");
		} finally {
			logger.warn("Shutdown");
		}
	}
};

const deleteFolder = (dir: string) => {
	fs.rmSync(`./${dir}`, { recursive: true, force: true });
};

const reconect = async () => {
	await Promise.all([waSock.logout()]);
	connectToWhatsApp().catch((e) =>
		logger.error(`connectToWhatsApp error: ${e}`)
	);
};
