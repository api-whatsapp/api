import {
	WASocket,
	makeWASocket,
	DisconnectReason,
	useMultiFileAuthState,
} from "baileys";
import { Boom } from "@hapi/boom";
import { logger } from "../config/logger";

export class SessionHandler {
	public async init(): Promise<WASocket> {
		const { state, saveCreds } =
			await useMultiFileAuthState("auth_info_baileys");

		const sock = makeWASocket({
			logger,
			generateHighQualityLinkPreview: false,
			linkPreviewImageThumbnailWidth: 0,
			printQRInTerminal: true,
			syncFullHistory: false,
			auth: state,
		});

		sock.ev.on("creds.update", saveCreds);

		sock.ev.on("connection.update", (update) => {
			const { connection, lastDisconnect } = update;
			if (connection === "close") {
				const shouldReconnect =
					(lastDisconnect!.error as Boom)?.output?.statusCode !==
					DisconnectReason.loggedOut;
				logger.warn(
					"connection closed due to ",
					lastDisconnect!.error,
					", reconnecting ",
					shouldReconnect
				);
				// reconnect if not logged out
				if (shouldReconnect) {
					this.init();
				}
			} else if (connection === "open") {
				logger.warn("opened connection");
			}
		});

		sock.ev.on("messages.upsert", async (m) => {
			logger.warn(m);
			// 	logger.warn("replying to", m.messages[0].key.remoteJid);
			// 	await sock.sendMessage(m.messages[0].key.remoteJid!, {
			// 		text: "Hello there!",
			// 	});
		});

		return sock;
	}

	public isWAConnected(): boolean {
		logger.warn("WA Connected");
		return true;
	}
}
