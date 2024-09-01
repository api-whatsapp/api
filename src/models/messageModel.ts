import { logger } from "../config/logger";
import { MessageUtility } from "../utils/messageUtility";
import type { WASendMessageResponse } from "../@types/baileys/WAMessages";

export type MessageResponse = {
	id: string;
	status: string;
	message: string;
};

export type MessageReq = {
	message: string;
	device_id: string;
	phone_number: number;
	message_type: string;
};

export function toMessageResponse(msg: WASendMessageResponse): MessageResponse {
	logger.info("toMessageResponse => " + JSON.stringify(msg, null, 2));
	const messageStatus = MessageUtility.getMessageStatus(msg.status);

	return {
		id: msg.key.id,
		status: messageStatus.status,
		message: messageStatus.status_message,
	};
}
