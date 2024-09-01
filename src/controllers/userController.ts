import type { Request, Response, NextFunction } from "express";
import type { CreateUserRequest } from "../models/userModel";
import { UserService } from "../services/userService";

export class UserController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateUserRequest = req.body as CreateUserRequest;
			const result = await UserService.register(request);
			res.status(201).json({
				data: result,
			});
		} catch (e) {
			next(e);
		}
	}
}
