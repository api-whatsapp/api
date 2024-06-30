export type WASendMessageResponse = {
	key: Key;
	status: number;
	message: Messages;
	messageTimestamp: string;
};

export type WAMessagesUpdate = {
	key: Key;
	update: Update;
};

type Key = {
	id: string;
	fromMe: boolean;
	remoteJid: string;
	participant?: string;
};

type Messages = {
	conversation: string;
	extendedTextMessage: ExtendedTextMessage;
};

type ExtendedTextMessage = {
	text: string;
	title: string;
	matchedText: string;
	description: string;
	previewType: string;
	canonicalUrl: string;
};

type Update = {
	status: number;
};
