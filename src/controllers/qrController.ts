import QRCode from "qrcode";
import { QRService } from "../services/qrService";
import { isWAConnected } from "../modules/whatsapp";
import type { NextFunction, Request, Response } from "express";

export class QRController {
	static async getQR(req: Request, res: Response, next: NextFunction) {
		try {
			if (!isWAConnected()) {
				await QRService.getQR().then((qr: string) => {
					res.status(200).json({
						qr_code: qr,
						image_url: `${req.protocol}://${req.get("host")}${req.originalUrl}/show?qrcode=${encodeURIComponent(qr)}`,
					});
				});
			} else {
				res.status(200).json({
					message: "WhatsApp Already Connected",
				});
			}
		} catch (e) {
			next(e);
		}
	}

	static async showQR(req: Request, res: Response, next: NextFunction) {
		try {
			const qrcode: string = (req.query.qrcode as string) || "";
			const qrCodeImage = await QRCode.toDataURL(qrcode);
			res.send(`
				<img src="${qrCodeImage}" alt="QR Code" style="display:block;margin-left:auto;margin-right:auto;border-style:solid;border-color:blue;"/>
				`);
		} catch (e) {
			next(e);
		}
	}
}
