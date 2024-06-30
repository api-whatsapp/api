import { z, ZodType } from "zod";

export class MessageValidation {
	static readonly SEND: ZodType = z.object({
		message: z.string(),
		device_id: z.string(),
		phone_number: z.number(),
		message_type: z.string(),
	});
}
