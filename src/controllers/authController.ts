import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import { LoginRq } from "../models/authModel";

export class AuthController {
	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const request: LoginRq = req.body as LoginRq;
			const result = await AuthService.login(request);
			res.status(201).json({
				data: result,
			});
		} catch (e) {
			next(e);
		}
	}
}
