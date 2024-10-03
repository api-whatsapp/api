import AuthService from "../services/authService";
import { LoginResponse, LoginRq } from "../models/authModel";
import type { Request, Response, NextFunction } from "express";

export default class AuthController {
	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const request: LoginRq = req.body as LoginRq;
			const result: LoginResponse = await AuthService.login(request);
			res.status(200).json(result);
		} catch (e) {
			next(e);
		}
	}
}
