import { isWAConnected } from "../modules/whatsapp";
import type { NextFunction, Request, Response } from "express";

export class QRController {
	static async getQR(req: Request, res: Response, next: NextFunction) {
		try {
			if (!isWAConnected()) {
				res.status(200).json({
					qr_code: "result",
					image_url: "result",
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
}
