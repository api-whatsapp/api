import "dotenv/config";
import fs from "node:fs";
import {
	type WASocket,
	makeWASocket,
	DisconnectReason,
	useMultiFileAuthState,
	type ConnectionState,
	WAMessageUpdate,
} from "baileys";
import { Boom } from "@hapi/boom";
import { logger } from "../config/logger";
import { gracefulShutdown } from "../main";
import { QRService } from "../services/qrService";
import { MessageService } from "../services/messageService";

const auth_dir: string = process.env.AUTH_DIR ?? "auth_data";

const { session } = { session: auth_dir };

const maxRetry = Number(process.env.MAX_RENEW_QR ?? 3);

const retry = 0;

export async function connectToWhatsApp(): Promise<WASocket> {
	const { state, saveCreds } = await useMultiFileAuthState(auth_dir);

	waSock.logout();
	const sock: WASocket = makeWASocket({
		logger,
		generateHighQualityLinkPreview: false,
		linkPreviewImageThumbnailWidth: 0,
		printQRInTerminal: false,
		syncFullHistory: false,
		auth: state,
	});

	waSock.ev.on("creds.update", saveCreds);
	waSock.ev.on(
		"connection.update",
		async (update: Partial<ConnectionState>) => {
			const { connection, lastDisconnect, qr } = update;
			if (qr != undefined) {
				QRService.updateQR(qr);
			}

			logger.warn(`connection ${connection}`);

			if (connection === "close") {
				const reason = new Boom(lastDisconnect?.error).output.statusCode;
				switch (reason) {
					case DisconnectReason.badSession:
						logger.error(
							`Bad Session File, Deleting ${session} and Scan Again`
						);
						deleteFolder(auth_dir);
						reconect();
						break;
					case DisconnectReason.connectionClosed:
						logger.error("Connection closed, reconnecting....");
						reconect();
						break;
					case DisconnectReason.connectionLost:
						logger.error("Connection Lost from Server, reconnecting...");
						timedOut(reason);
						break;
					case DisconnectReason.connectionReplaced:
						logger.error(
							"Connection Replaced, Another New Session Opened, Please Close Current Session First"
						);
						await Promise.all([waSock.logout()]);
						break;
					case DisconnectReason.loggedOut:
						logger.error(
							`Device Logged Out, Deleting ${session} and Scan Again.`
						);
						deleteFolder(auth_dir);
						reconect();
						break;
					case DisconnectReason.restartRequired:
						logger.error("Restart Required, Restarting...");
						reconect();
						break;
					case DisconnectReason.timedOut:
						logger.error("Connection TimedOut, Reconnecting...");
						timedOut(reason);
						break;
					default:
						waSock.end(lastDisconnect?.error);
						break;
				}
			} else if (connection === "open") {
				logger.info("opened connection");
			}
		}
	);

	waSock.ev.on("messages.update", async (arg: WAMessageUpdate[]) => {
		MessageService.messageUpdated(arg);
	});

	return sock;
}
