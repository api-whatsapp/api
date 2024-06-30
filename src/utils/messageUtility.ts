import type { MessageStatus } from "@prisma/client/edge";

export class MessageUtility {
	static getMessageStatus(statusCode: number): MessageStatus {
		switch (statusCode) {
			case 0:
				return "ERROR";
			case 1:
				return "PENDING";
			case 2:
				return "SERVER_ACK";
			case 3:
				return "DELIVERY_ACK";
			case 4:
				return "READ";
			case 5:
				return "PLAYED";
			default:
				return "ERROR";
		}
	}
}
