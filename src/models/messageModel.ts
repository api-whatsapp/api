import { logger } from "../config/logger";
import { MessageUtility } from "../utils/messageUtility";
import type { WASendMessageResponse } from "../@types/baileys/WAMessages";

export type MessageResponse = {
	id: string;
	status: string;
	messages: string;
};

export type MessageReq = {
	message: string;
	device_id: string;
	phone_number: number;
	message_type: string;
};

export function toMessageResponse(msg: WASendMessageResponse): MessageResponse {
	logger.error("toMessageResponse=>" + JSON.stringify(msg, null, 2));

	return {
		id: msg.key.id,
		status: MessageUtility.getMessageStatus(msg.status),
		messages: "Message is pending and waiting to be processed.",
	};
}
