import rateLimit from "express-rate-limit";
import { prismaClient } from "../app/database.js";

const rateLimitConfig = {
	points: 10, // 6 points
	duration: 1, // Per menit
};

const isPremium = async (bearerToken) => {
	if (!bearerToken) {
		return 10;
	} else {
		try {
			const tokenCheck = await prismaClient.user.findUnique({
				where: {
					token: bearerToken.substr(7),
				},
				select: { quota: true },
			});
			return tokenCheck ? tokenCheck.quota : 10;
		} catch (error) {
			/* istanbul ignore next */
			console.error(error);
		}
	}
};

export const limiter = rateLimit({
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	windowMs: rateLimitConfig.duration * 60 * 1000,
	keyGenerator: (req) => req.ip,
	limit: async (req) => {
		const level = await isPremium(req.headers.authorization);
		return level;
	},
	message: async (req, res) => {
		res.status(429).json({
			message: `You can only make ${rateLimitConfig.points} requests every ${rateLimitConfig.duration} minutes, please try again later.`,
		});
	},
});
