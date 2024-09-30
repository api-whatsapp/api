import QRCode from "qrcode";
import { UserData } from "../models/userModel";
import { QRService } from "../services/qrService";
import { ValidatedRequest } from "../models/jwtRqInterface";
import type { NextFunction, Request, Response } from "express";

export class QRController {
	static async getQR(req: ValidatedRequest, res: Response, next: NextFunction) {
		try {
			const userData: UserData = req.userData;
			await QRService.getQR(userData).then((qr: string) => {
				res.status(200).json({
					qr_code: qr,
					image_url: `${req.protocol}://${req.get("host")}${req.originalUrl}/show?qrcode=${encodeURIComponent(qr)}`,
				});
			});
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
