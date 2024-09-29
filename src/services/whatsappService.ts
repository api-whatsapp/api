import { logger } from "../config/logger";
import { WASocket, makeWASocket, useMultiFileAuthState } from "baileys";

export class WhatsappService {
	public async init(): Promise<WASocket> {
		const { state } = await useMultiFileAuthState("auth_info_baileys");
		return makeWASocket({
			auth: state,
			logger: logger,
			syncFullHistory: false,
			printQRInTerminal: true,
			linkPreviewImageThumbnailWidth: 0,
			generateHighQualityLinkPreview: false,
		});
	}
}
