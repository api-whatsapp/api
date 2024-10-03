import { z, ZodType } from "zod";

export default class AuthValidation {
	static readonly LOGIN: ZodType = z.object({
		email: z.string().email(),
		password: z.string(),
	});
}
