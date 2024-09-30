import { logger } from "../config/logger";
import { prismaClient } from "../config/database";
import { Validation } from "../validation/validation";
import { ResponseError } from "../errors/responseErrors";
import { MessageUtility } from "../utils/messageUtility";
import { MessageValidation } from "../validation/messageValidation";
import type { WASendMessageResponse } from "../@types/baileys/WAMessages";
import { WAMessageUpdate } from "baileys";
import {
	toMessageResponse,
	type MessageReq,
	type MessageResponse,
} from "../models/messageModel";
import { SessionHandler } from "../handler/sessionHandler";

export class MessageService {
	private sessionHandler: SessionHandler;

	constructor() {
		this.sessionHandler = new SessionHandler();
	}

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

		if (sessionHandler.isWAConnected()) {
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
							payload: JSON.stringify(sendMessageReq),
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

	static async messageUpdated(message: WAMessageUpdate[]) {
		logger.info(
			`MessageService.messageUpdated|\n|${JSON.stringify(message, undefined, 2)}\n|FINISH UPDATE`
		);
		for (let i = 0; i < message.length; i++) {
			const keyId: string = message[i].key.id;
			try {
				const keyIdCount = await prismaClient.message.count({
					where: {
						id: keyId,
						NOT: {
							OR: [{ status: "READ" }, { status: "PLAYED" }],
						},
					},
				});

				if (keyIdCount > 0) {
					logger.info(`${i} => ${keyId}`);
					const messageStatus = MessageUtility.getMessageStatus(
						message[i].update.status
					);
					await prismaClient.message.update({
						data: {
							status: messageStatus.status,
							message: messageStatus.status_message,
						},
						where: {
							id: keyId,
						},
					});
				}
			} catch (e) {
				logger.error(`${keyId} Not Found`);
				logger.error(e);
			}
		}
	}

	static async getAllMessages() {
		const message = await prismaClient.message.findMany({
			select: {
				id: true,
				status: true,
				message: true,
				send_at: true,
				payload: true,
			},
		});
		for (const msg of message) {
			msg.payload = JSON.parse(msg.payload);
		}
		logger.info(JSON.stringify(message));
		return message;
	}

	static async getMessageInfo(messageId: string) {
		const message = await prismaClient.message.findUnique({
			where: {
				id: messageId,
			},
		});

		logger.info(JSON.stringify(message));
		return message;
	}
}
