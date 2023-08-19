import { prismaClient } from "../app/database.js";

export const authMiddleware = async (req, res, next) => {
	const token = req.headers.authorization;
	const url = req.url;

	if (url === "/users") {
		return next();
	}

	if (!token) {
		return res.status(401).json({
			message: "Missing API token.",
		});
	} else {
		const bearer = token.split(" ")[1];
		if (!bearer) {
			return res.status(403).json({
				message: "Invalid API token.",
			});
		}

		const user = await prismaClient.user.findUnique({
			where: {
				token: bearer,
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
	}
	next();
};
