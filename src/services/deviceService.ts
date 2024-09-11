import { UserData } from "../models/userModel";
import { prismaClient } from "../config/database";
import { Validation } from "../validation/validation";
import { ResponseError } from "../errors/responseErrors";
import { DeviceValidation } from "../validation/deviceValidation";
import {
	addDeviceResponse,
	type DeviceData,
	type DeviceRequest,
} from "../models/deviceModel";

export class DeviceService {
	static async add(
		request: DeviceRequest,
		userData: UserData
	): Promise<DeviceData> {
		const deviceRq = Validation.validate(DeviceValidation.ADD, request);

		const deviceExists: number | null = await prismaClient.device.count({
			where: {
				device_id: deviceRq.device_id,
				userEmail: userData.email,
			},
		});

		if (deviceExists != 0) {
			throw new ResponseError(400, "Device already added");
		}

		const device = await prismaClient.device.create({
			data: {
				device_id: deviceRq.device_id,
				userEmail: userData.email,
			},
		});

		return addDeviceResponse(device);
	}
}
