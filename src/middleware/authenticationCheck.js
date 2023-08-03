import { prismaClient } from "../app/database.js";

export const authenticationCheck = async (req, res, next) => {
	const token = req.headers.authorization;
	// Chech if header auth is exist
	if (!token) {
		return res.status(401).json({
			message: "Missing API token.",
		});
	} else {
		const bearer = token.split(" ")[1];
		// Chech if header auth is not empty
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

		// Chech if header auth is registed in database
		if (!user) {
			return res.status(403).json({
				message: "Invalid API token.",
			});
		}

		global.token = bearer;
		global.email = user.email;
		global.quota = user.quota;
	}
	next();
};

// Chech if header auth is registed in database
