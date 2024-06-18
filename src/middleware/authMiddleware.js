import { prismaClient } from "../app/database.js";

export const authMiddleware = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({
			message: "Missing API token.",
		});
	} else {
		try {
			const user = await prismaClient.user.findUnique({
				where: {
					token: token.substr(7),
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
			return res.status(500).json({
				error: error,
			});
		}
	}
	next();
};
