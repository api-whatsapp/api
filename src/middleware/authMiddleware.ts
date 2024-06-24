import { prismaClient } from "../app/database";
import type { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({
			message: "Missing API token.",
		});
	} else {
		try {
			const user = await prismaClient.user.findUnique({
				where: {
					token: token.substring(7),
				},
				select: {
					email: true,
					quota: true,
				},
			});

			if (!user) {
				return res.status(403).json({
					message: "Invalid API token.",
				});
			}
		} catch (error) {
			/* istanbul ignore next */
			return res.status(500).json({
				error: error,
			});
		}
	}
	next();
};
