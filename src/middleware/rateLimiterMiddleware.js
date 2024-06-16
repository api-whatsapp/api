import rateLimit from "express-rate-limit";
import { prismaClient } from "../app/database.js";

const rateLimitConfig = {
	minute: 1,
};

const defaultLimit = { level: "guest", quota: 10 };

const isPremium = async (bearerToken) => {
	if (!bearerToken) {
		return defaultLimit;
	} else if (!bearerToken.split(" ")[1]) {
		return defaultLimit;
	} else {
		try {
			const tokenCheck = await prismaClient.user.findUnique({
				where: {
					token: bearerToken.split(" ")[1],
				},
				select: {
					level: true,
					quota: true,
				},
			});
			return tokenCheck || defaultLimit;
		} catch (error) {
			/* istanbul ignore next */
			console.error(error);
		}
	}
};

export const limiter = rateLimit({
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	windowMs: rateLimitConfig.minute * 60 * 1000,
	keyGenerator: (req) => req.ip,
	limit: async (req) => {
		const level = await isPremium(req.headers.authorization);
		return level.quota;
	},
	message: async (req, res) => {
		const user = await isPremium(req.headers.authorization);
		res.status(429).json({
			message: `You can only make ${user.quota} requests every ${rateLimitConfig.minute} minutes, please try again later.`,
		});
	},
});
