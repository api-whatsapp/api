import type { NextFunction, Response } from "express";
import { DeviceService } from "../services/deviceService";
import { ValidatedRequest } from "../models/jwtRqInterface";
import { DeviceData, DeviceRequest } from "../models/deviceModel";
import { logger } from "../config/logger";
import { UserData } from "../models/userModel";

export class DeviceController {
	static async addDevice(
		req: ValidatedRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const request: DeviceRequest = req.body as DeviceRequest;
			const userData: UserData = req.userData;
			logger.warn(`User Data ${JSON.stringify(userData)}`);

			const result: DeviceData = await DeviceService.add(request, userData);

			res.status(201).json(result);
		} catch (e) {
			next(e);
		}
	}
}
