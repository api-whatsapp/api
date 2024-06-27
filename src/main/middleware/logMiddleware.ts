import { logger } from "../../config/logger";
import type { NextFunction, Request, Response } from "express";

export const reqInterceptor = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.info(`Headers: ${JSON.stringify(req.headers, null, 2)}`);
	logger.info(`Body: ${JSON.stringify(req.body, null, 2)}`);
	next();
};
