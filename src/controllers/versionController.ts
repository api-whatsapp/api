import { logger } from "../app/logger";
import type { Request, Response } from "express";
import { Config } from "../config/config";

const version: string = process.env.APP_VERSION ?? Config.version;

const getVersion = async (req: Request, res: Response) => {
	try {
		res.status(200).json({
			message: "PakaiWA.my.id - UnOfficial WhatsApp API Gateway",
			version: version,
			stability: "Developer-Preview",
		});
	} catch (e) {
		/* istanbul ignore next */
		const error = e instanceof Error ? e.message : "Internal Server Error";
		/* istanbul ignore next */
		logger.error(e);
		/* istanbul ignore next */
		res.status(500).json({ message: error });
	}
};

export default getVersion;
