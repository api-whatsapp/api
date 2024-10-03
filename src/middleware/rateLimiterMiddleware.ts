import rateLimit from "express-rate-limit";
import { logger } from "../config/logger";
import type { Request, Response } from "express";

export default class RateLimiterMiddleware {
	static readonly rateLimitConfig = {
		points: 10, // 6 points
		duration: 1, // Per menit
	};

	static limiter() {
		rateLimit({
			legacyHeaders: false, // Disable the `X-RateLimit-*` headers
			standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
			windowMs: RateLimiterMiddleware.rateLimitConfig.duration * 60 * 1000,
			limit: async (req: Request): Promise<number> => {
				const level = await RateLimiterMiddleware.isPremium(
					req.headers.authorization
				);
				return level as number;
			},
			message: async (req: Request, res: Response) => {
				res.status(429).json({
					message: `You can only make ${RateLimiterMiddleware.rateLimitConfig.points} requests every ${RateLimiterMiddleware.rateLimitConfig.duration} minutes, please try again later.`,
				});
			},
		});
	}

	private static async isPremium(
		bearerToken: string | undefined
	): Promise<number> {
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
	}
}
