import { z, ZodType } from "zod";

export class UserValidation {
	static readonly REGISTER: ZodType = z.object({
		email: z.string().email(),
		name: z.string().min(8).max(100),
	});
}
