import rateLimit from "express-rate-limit";
import { prismaClient } from "../config/database";
import type { Request, Response } from "express";
import { logger } from "../config/logger";

const rateLimitConfig = {
	points: 10, // 6 points
	duration: 1, // Per menit
};

const isPremium = async (bearerToken: string | undefined) => {
	if (!bearerToken) {
		return 10;
	} else {
		try {
			const tokenCheck = await prismaClient.user.findUnique({
				where: {
					token: bearerToken.substring(7),
				},
				select: { quota: true },
			});
			return tokenCheck ? tokenCheck.quota : 10;
		} catch (e) {
			/* istanbul ignore next */
			logger.error(e);
		}
	}
};

export const limiter = rateLimit({
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	windowMs: rateLimitConfig.duration * 60 * 1000,
	limit: async (req: Request): Promise<number> => {
		const level = await isPremium(req.headers.authorization);
		return level as number;
	},
	message: async (req: Request, res: Response) => {
		res.status(429).json({
			message: `You can only make ${rateLimitConfig.points} requests every ${rateLimitConfig.duration} minutes, please try again later.`,
		});
	},
});
