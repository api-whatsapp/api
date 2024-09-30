import { UserData } from "../models/userModel";
import type { NextFunction, Response } from "express";
import { DeviceService } from "../services/deviceService";
import { ValidatedRequest } from "../models/jwtRqInterface";
import { DeviceUseCase } from "../usacase/deviceUsecase";
import { DeviceData, DeviceList, DeviceRequest } from "../models/deviceModel";

export class DeviceController {
	private usecase: DeviceUseCase;

	constructor() {
		this.usecase = new DeviceUseCase();
	}

	public static async addDevice(
		req: ValidatedRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const userData: UserData = req.userData;
			const request: DeviceRequest = req.body as DeviceRequest;
			const result: DeviceData = await DeviceService.add(request, userData);

			res.status(201).json(result);
		} catch (e) {
			next(e);
		}
	}

	static async getDeviceData(
		req: ValidatedRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const userData: UserData = req.userData;

			const result: DeviceData | object = await DeviceService.getDeviceData(
				userData,
				req.params.deviceId.toLocaleLowerCase()
			);

			res.status(200).json(result);
		} catch (e) {
			next(e);
		}
	}

	static async remove(
		req: ValidatedRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const userData: UserData = req.userData;
			const deviceId: string = req.params.deviceId.toLocaleLowerCase();
			const del = await DeviceService.removeDevice(userData, deviceId);
			if (del) {
				res.status(204).json();
			} else {
				res.status(404).json({
					message: `${deviceId} Not Exist`,
				});
			}
		} catch (e) {
			next(e);
		}
	}

	static async getDeviceList(
		req: ValidatedRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const userData: UserData = req.userData;

			const result: DeviceList = await DeviceService.getDeviceList(userData);

			res.status(200).json(result);
		} catch (e) {
			next(e);
		}
	}
}
