import { logger } from "../config/logger";
import { prismaClient } from "../config/database";
import { Validation } from "../validation/validation";
import { ResponseError } from "../errors/responseErrors";
import { MessageUtility } from "../utils/messageUtility";
import { waSock, isWAConnected } from "../modules/whatsapp";
import { MessageValidation } from "../validation/messageValidation";
import type { WASendMessageResponse } from "../@types/baileys/WAMessages";
import {
	toMessageResponse,
	type MessageReq,
	type MessageResponse,
} from "../models/messageModel";

export class MessageService {
	static async sendMessage(request: MessageReq): Promise<MessageResponse> {
		const sendMessageReq = Validation.validate(MessageValidation.SEND, request);
		logger.info(
			`MessageService.sendMessage => ${JSON.stringify(sendMessageReq, null, 2)}`
		);
		let message: MessageResponse = {
			id: "",
			status: "",
			message: "",
		};

		if (!isWAConnected()) {
			throw new ResponseError(
				503,
				"Service Unavailable, WhatsApp not Connected"
			);
		}
		try {
			await waSock
				.sendMessage(`${sendMessageReq.phone_number}@s.whatsapp.net`, {
					text: sendMessageReq.message,
				})
				.then(async (result: WASendMessageResponse) => {
					const messageStatus = MessageUtility.getMessageStatus(result.status);
					await prismaClient.message.create({
						data: {
							id: result.key.id,
							status: messageStatus.status,
							message: messageStatus.status_message,
							text: sendMessageReq.message,
						},
					});
					message = toMessageResponse(result);
				})
				.catch((e: Error) => {
					throw new ResponseError(500, `${e}`);
				});
		} catch (e) {
			throw new ResponseError(500, `${e}`);
		}
		return message;
	}
}
