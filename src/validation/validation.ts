import type { ZodType } from "zod";

export default class Validation {
	public static validate<T>(schema: ZodType, data: T): T {
		return schema.parse(data);
	}
}
