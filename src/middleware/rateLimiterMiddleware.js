import rateLimit from "express-rate-limit";
import { prismaClient } from "../app/database.js";

const rateLimitConfig = {
	minute: 1,
};

const isPremium = async (bearerToken) => {
	if (!bearerToken) {
		return "guest";
	} else {
		const token = bearerToken.split(" ")[1];
		const tokenCheck = await prismaClient.user.findUnique({
			where: {
				token: token,
			},
			select: {
				level: true,
			},
		});
		return tokenCheck ? tokenCheck.level : "guest";
	}
};

export const limiter = rateLimit({
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	windowMs: rateLimitConfig.minute * 60 * 1000,
	keyGenerator: (req) => req.headers.authorization || req.ip,
	max: async (req) => {
		const level = await isPremium(req.headers.authorization);
		if (level === "user") {
			return 100;
		} else if (level === "member") {
			return 250;
		} else if (level === "premium") {
			return 1000;
		} else {
			return 10;
		}
	},
	message: async (req, res) => {
		res.status(429).json({
			message: "Too many requests, please try again later.",
		});
	},
});
