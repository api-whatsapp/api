export type Messages = {
	messages: MessageElement[];
	type: string;
};

export type MessageElement = {
	key: Key;
	messageTimestamp: number;
	pushName: string;
	broadcast: boolean;
	message: MessageMessage;
};

export type Key = {
	remoteJid: string;
	fromMe: boolean;
	id: string;
	participant: string;
};

export type MessageMessage = {
	conversation: string;
	extendedTextMessage: ExtendedTextMessage;
	messageContextInfo: MessageContextInfo;
	senderKeyDistributionMessage: SenderKeyDistributionMessage;
	reactionMessage: ReactionMessage;
};

export type ExtendedTextMessage = {
	text: string;
	contextInfo: ContextInfo;
};

export type ContextInfo = {
	stanzaId: string;
	participant: string;
	quotedMessage: QuotedMessage;
	mentionedJid: string[];
};

export type QuotedMessage = {
	conversation: string;
};

export type MessageContextInfo = {
	deviceListMetadata: DeviceListMetadata;
	deviceListMetadataVersion: number;
};

export type DeviceListMetadata = {
	senderKeyHash: string;
	senderTimestamp: string;
	recipientKeyHash: string;
	recipientTimestamp: string;
};

export type ReactionMessage = {
	key: Key;
	text: string;
	senderTimestampMs: string;
};

export type SenderKeyDistributionMessage = {
	groupId: string;
	axolotlSenderKeyDistributionMessage: string;
};
