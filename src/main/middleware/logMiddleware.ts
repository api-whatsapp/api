import { v7 as uuid7 } from "uuid";
import { logger } from "../../config/logger";
import type { NextFunction, Request, Response } from "express";

export const reqInterceptor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	req.headers.reqId = uuid7();
	logger.info(`Receive new Request with uuid: ${req.headers.reqId}`);
	logger.info(`REQ Headers: ${JSON.stringify(req.headers, null, 2)}`);
	logger.info(`REQ Body: ${JSON.stringify(req.body, null, 2)}`);
	next();
};
