import type { ZodType } from "zod";

export class Validation {
	static validate<T>(schema: ZodType, data: object): T {
		return schema.parse(data);
	}
}
