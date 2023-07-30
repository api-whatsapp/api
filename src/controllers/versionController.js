import "dotenv/config";
import { logger } from "../app/logger.js";
import { prismaClient } from "../app/database.js";

const getVersion = async (req, res) => {
	const bearer = req.headers.authorization.split(" ");
	const bearerToken = bearer[1];
	const version = process.env.APP_VERSION;

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
			logger.info("Version check success.");
		} catch (error) {
			res.status(500).json({ message: error.message });
			logger.error(error);
		}
	} else {
		res.status(401).json({
			message: "Missing API token.",
		});
	}
};

export default getVersion;
