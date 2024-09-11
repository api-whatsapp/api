type SerializePrisma<T> = T extends Buffer
	? {
			type: "Buffer";
			data: number[];
		}
	: T extends bigint
		? string
		: T extends null
			? never
			: T;

export type MakeSerializedPrisma<T extends Record<string, any>> = {
	[K in keyof T]: SerializePrisma<T[K]>;
};
