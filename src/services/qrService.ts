import { logger as log } from "../config/logger";
import { prismaClient } from "../config/database";
import { UserData } from "../models/userModel";

export class QRService {
	static async getQR(userData: UserData): Promise<string> {
		const qrData = await prismaClient.qrCode.findUnique({
			where: {
				id: userData.id,
			},
			select: { qr: true },
		});
		console.warn(JSON.stringify(qrData));

		if (qrData == null) {
			return "";
		} else {
			return qrData.qr;
		}
	}

	static async updateQR(qr: string) {
		try {
			await prismaClient.qrCode.upsert({
				where: { id: 1 },
				update: { id: 1, qr: qr },
				create: { id: 1, qr: qr },
			});
		} catch (error) {
			log.error(`Unhandled Error: ${error}`);
		}
	}
}
