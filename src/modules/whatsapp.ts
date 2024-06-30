/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	makeWASocket,
	DisconnectReason,
	useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import { logger } from "../config/logger";
import type { WAMessagesUpdate } from "../@types/baileys/WAMessages";
const { session } = { session: "auth_data" };

export let waSock: any;

export async function connectToWhatsApp(): Promise<void> {
	const { state, saveCreds } = await useMultiFileAuthState("auth_data");

	waSock = makeWASocket({
		generateHighQualityLinkPreview: false,
		linkPreviewImageThumbnailWidth: 0,
		printQRInTerminal: true,
		syncFullHistory: false,
		auth: state,
	});

	waSock.ev.on("creds.update", saveCreds);

	waSock.ev.on(
		"connection.update",
		async (update: { connection: any; lastDisconnect: any }) => {
			const { connection, lastDisconnect } = update;
			if (connection === "close") {
				const reason = new Boom(lastDisconnect?.error).output.statusCode;
				switch (reason) {
					case DisconnectReason.badSession:
						logger.error(
							`Bad Session File, Please Delete ${session} and Scan Again`
						);
						waSock.logout();
						break;
					case DisconnectReason.connectionClosed:
						logger.error("Connection closed, reconnecting....");
						connectToWhatsApp();
						break;
					case DisconnectReason.connectionLost:
						logger.error("Connection Lost from Server, reconnecting...");
						connectToWhatsApp();
						break;
					case DisconnectReason.connectionReplaced:
						logger.error(
							"Connection Replaced, Another New Session Opened, Please Close Current Session First"
						);
						waSock.logout();
						break;
					case DisconnectReason.loggedOut:
						logger.error(
							`Device Logged Out, Please Delete ${session} and Scan Again.`
						);
						waSock.logout();
						break;
					case DisconnectReason.restartRequired:
						logger.error("Restart Required, Restarting...");
						connectToWhatsApp();
						break;
					case DisconnectReason.timedOut:
						logger.error("Connection TimedOut, Reconnecting...");
						connectToWhatsApp();
						break;
					default:
						waSock.end(
							`Unknown DisconnectReason: ${reason}|${lastDisconnect?.error}`
						);
						break;
				}
			} else if (connection === "open") {
				logger.info("opened connection");
			}
		}
	);

	waSock.ev.on("messages.update", async (m: Array<WAMessagesUpdate>) => {
		logger.info(
			`messages.update|\n|${JSON.stringify(m, undefined, 2)}\n|FINISH UPDATE`
		);
		// for (let i = 0; i < m.length; i++) {
		// 	try {
		// 		logger.warn(`i => ${i} ${m[i].key.id}`);
		// 		await prismaClient.message.upsert({
		// 			update: {
		// 				status: MessageUtility.getMessageStatus(m[i].update.status),
		// 				message: "Updated",
		// 			},
		// 			create: {
		// 				id: m[i].key.id,
		// 				status: MessageUtility.getMessageStatus(m[i].update.status),
		// 				message: "Created",
		// 			},
		// 			where: {
		// 				id: m[i].key.id,
		// 				NOT: {
		// 					OR: [{ status: "READ" }, { status: "PLAYED" }],
		// 				},
		// 			},
		// 		});
		// 	} catch (error) {
		// 		logger.warn(`${m[i].key.id} Not Found`);
		// 		logger.error(error);
		// 	}
		// }
	});
}

export const isWAConnected = () => {
	return waSock.user;
};
