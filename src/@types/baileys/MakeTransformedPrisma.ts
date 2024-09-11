import type Long from "long";

/** Transform unsupported types into supported Prisma types */
export type MakeTransformedPrisma<
	T extends Record<string, any>,
	TransformObject extends boolean = true,
> = {
	[K in keyof T]: TransformPrisma<T[K], TransformObject>;
};

type TransformPrisma<T, TransformObject> = T extends Long
	? number
	: T extends Uint8Array
		? Buffer
		: T extends null
			? never
			: T extends object
				? TransformObject extends true
					? object
					: T
				: T;
