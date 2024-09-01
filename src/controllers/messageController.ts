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

	static async getAllMessages(req: Request, res: Response, next: NextFunction) {
		try {
			await MessageService.getAllMessages().then((msg) => {
				res.status(200).json({ data: msg });
			});
		} catch (e) {
			next(e);
		}
	}

	static async getMessageInfo(req: Request, res: Response, next: NextFunction) {
		try {
			const messageId = req.params.messageId;
			await MessageService.getMessageInfo(messageId).then((msg) => {
				res.status(200).json({ data: msg });
			});
		} catch (e) {
			next(e);
		}
	}
}
