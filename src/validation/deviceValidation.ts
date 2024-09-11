import { z, ZodType } from "zod";

export class DeviceValidation {
	static readonly ADD: ZodType = z.object({
		device_id: z.string(),
	});
}
