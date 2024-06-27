import "dotenv/config";
import { logger } from "../config/logger";
import { Config } from "../config/config";
import type { Request, Response } from "express";

const version: string = process.env.APP_VERSION ?? Config.version;

const getVersion = async (req: Request, res: Response) => {
	try {
		res.status(200).json({
			message: "PakaiWA.my.id - UnOfficial WhatsApp API Gateway",
			version: version,
			stability: "Developer-Preview",
		});
	} catch (e) /* istanbul ignore next */ {
		const error = e instanceof Error ? e.message : "Internal Server Error";
		logger.error(error);
		res.status(500).json({ message: error });
	}
};

export default getVersion;
