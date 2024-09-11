import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../config/logger";
import { UserData } from "../models/userModel";
import { ValidationRequest } from "../models/jwtRqInterface";

export const authMiddleware = async (
	req: ValidationRequest,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({
			message: "Missing API token.",
		});
	} else {
		try {
			const token = authorization.substring(7);
			const secret: string = process.env.JWT_SECERET!;
			const jwtDecode = jwt.verify(token, secret);

			req.userData = jwtDecode as UserData;
		} catch (error) {
			logger.error(error);
			return res.status(401).json({
				message: "Invalid API token.",
			});
		}
	}
	next();
};
