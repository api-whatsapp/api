import { MessageService } from "../services/messageService";
import type { NextFunction, Request, Response } from "express";
import type { MessageReq, MessageResponse } from "../models/messageModel";

export class MessageController {
	static async sendMessage(req: Request, res: Response, next: NextFunction) {
		try {
			const request: MessageReq = req.body as MessageReq;
			await MessageService.sendMessage(request).then((msg: MessageResponse) => {
				res.status(200).json(msg);
			});
		} catch (e) {
			next(e);
		}
	}
}
