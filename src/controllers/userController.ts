import type { Request, Response, NextFunction } from "express";
import type { CreateUserRequest } from "../models/userModel";
import { UserService } from "../services/userService";
import { logger } from "../app/logger";

export class UserController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateUserRequest = req.body as CreateUserRequest;
			logger.warn(JSON.stringify(req.body));
			const result = await UserService.register(request);
			res.status(201).json({
				data: result,
			});
		} catch (e) {
			next(e);
		}
	}
}
