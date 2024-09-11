import { UserData } from "../models/userModel";
import type { NextFunction, Response } from "express";
import { DeviceService } from "../services/deviceService";
import { ValidatedRequest } from "../models/jwtRqInterface";
import { DeviceData, DeviceList, DeviceRequest } from "../models/deviceModel";

export class DeviceController {
	static async addDevice(
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

			const result: DeviceData = await DeviceService.getDeviceData(
				userData,
				req.params.deviceId
			);

			res.status(200).json(result);
		} catch (e) {
			next(e);
		}
	}

	static async removeDevice(
		req: ValidatedRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const userData: UserData = req.userData;

			await DeviceService.removeDevice(userData, req.params.deviceId);

			res.status(204).json();
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
