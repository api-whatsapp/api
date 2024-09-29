import { UserData } from "../models/userModel";
import { prismaClient } from "../config/database";
import { Device } from "@prisma/client/index-browser";
import { Validation } from "../validation/validation";
import { ResponseError } from "../errors/responseErrors";
import { DeviceValidation } from "../validation/deviceValidation";
import {
	addDeviceResponse,
	DeviceList,
	deviceListResponse,
	toDeviceResponse,
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
				device_id: deviceRq.device_id.toLocaleLowerCase(),
				user_email: userData.email,
			},
		});

		if (deviceExists != 0) {
			throw new ResponseError(400, "Device already added");
		}

		const device = await prismaClient.device.create({
			data: {
				device_id: deviceRq.device_id.toLocaleLowerCase(),
				user_email: userData.email,
			},
		});

		return addDeviceResponse(device);
	}

	static async getDeviceData(
		userData: UserData,
		deviceId: string
	): Promise<DeviceData | object> {
		const deviceData: Device | null = await prismaClient.device.findFirst({
			where: {
				device_id: deviceId,
				user_email: userData.email,
			},
		});

		if (deviceData) {
			return toDeviceResponse(deviceData);
		} else {
			return new Object();
		}
	}

	static async getDeviceList(userData: UserData): Promise<DeviceList> {
		const deviceList = await prismaClient.device.findMany({
			where: { user_email: userData.email },
		});
		return deviceListResponse(deviceList);
	}

	static async removeDevice(userData: UserData, deviceId: string) {
		await prismaClient.device.deleteMany({
			where: {
				device_id: deviceId,
				user_email: userData.email,
			},
		});
	}
}
