export class MessageUtility {
	static getMessageStatus(statusCode: number) {
		const messageStatus = {
			status: "ERROR",
			status_message: "ERROR",
		};

		switch (statusCode) {
			case 1:
				messageStatus.status = "PENDING";
				messageStatus.status_message =
					"Message is pending and waiting to be processed";
				break;
			case 2:
				messageStatus.status = "SERVER_ACK";
				messageStatus.status_message = "Message has been sent.";
				break;
			case 3:
				messageStatus.status = "DELIVERY_ACK";
				messageStatus.status_message = "Message has been Delivered .";
				break;
			case 4:
				messageStatus.status = "READ";
				messageStatus.status_message = "Message has been Read.";
				break;
			case 5:
				messageStatus.status = "PLAYED";
				messageStatus.status_message = "Message has been Played.";
				break;
		}
		return messageStatus;
	}
}
