import "dotenv/config";
import { logger } from "../app/logger.js";
import { prismaClient } from "../app/database.js";

const getVersion = async (req, res) => {
	const bearer = req.headers.authorization.split(" ");
	const version = process.env.APP_VERSION;
	const bearerToken = bearer[1];

	const tokenCheck = await prismaClient.user.findUnique({
		where: {
			token: bearerToken,
		},
		select: {
			quota: true,
		},
	});

	if (tokenCheck) {
		try {
			res.status(200).json({
				message: "PakaiWA.my.id - UnOfficial WhatsApp API Gateway",
				version: version,
				stability: "Developer-Preview",
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
			logger.error(error);
		}
	} else {
		res.status(403).json({
			message: "Invalid API token.",
		});
	}
};

export default getVersion;
