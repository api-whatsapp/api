import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "../config/logger";
import { UserData } from "../models/userModel";

interface ValidationRequest extends Request {
	userData: UserData;
}

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const request = req as ValidationRequest;
	const { authorization } = request.headers;

	if (!authorization) {
		return res.status(401).json({
			message: "Missing API token.",
		});
	} else {
		try {
			const token = authorization.substring(7);
			const secret: string = process.env.JWT_SECERET!;
			const jwtDecode = jwt.verify(token, secret);

			if (typeof jwtDecode !== "string") {
				request.userData = jwtDecode as UserData;
			}
		} catch (error) {
			logger.error(error);
			return res.status(401).json({
				message: "Invalid API token.",
			});
		}
	}
	next();
};
