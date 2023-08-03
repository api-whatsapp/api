import "dotenv/config";
import { logger } from "../app/logger.js";

const getVersion = async (req, res) => {
	const version = process.env.APP_VERSION;

	try {
		res.status(200).json({
			message: "PakaiWA.my.id - UnOfficial WhatsApp API Gateway",
			version: version,
			stability: "Developer-Preview",
		});
	} catch (error) {
		/* istanbul ignore next */
		res.status(500).json({ message: error.message });
		/* istanbul ignore next */
		logger.error(error);
	}
};

export default getVersion;
