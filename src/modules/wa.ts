import type { ConnectionState, proto, SocketConfig, WASocket } from "baileys";
import makeWASocket, {
	Browsers,
	isJidBroadcast,
	makeCacheableSignalKeyStore,
} from "baileys";

import { Store } from "baileys-store-pakaiwa";

type Session = WASocket & {
	destroy: () => Promise<void>;
	store: Store;
};

type createSessionOptions = {
	sessionId: string;
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

export async function createSession(options: createSessionOptions) {
	const {
		sessionId,
		res,
		SSE = false,
		readIncomingMessages = false,
		socketConfig,
	} = options;

	const configID = `${SESSION_CONFIG_ID}-${sessionId}`;
	const connectionState: Partial<ConnectionState> = { connection: "close" };

	const handleConnectionUpdate = SSE
		? handleSSEConnectionUpdate
		: handleNormalConnectionUpdate;
	const { state, saveCreds } = await useSession(sessionId);

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
	});
}
