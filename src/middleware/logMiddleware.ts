import { v7 as uuid7 } from "uuid";
import { logger } from "../../src/config/logger";
import type { NextFunction, Request, Response } from "express";

export default class LogMiddleware {
	static reqInterceptor(req: Request, res: Response, next: NextFunction) {
		req.headers.reqId = uuid7();
		const reqData = {
			reqId: req.headers.reqId,
			header: req.headers,
			payload: req.body,
		};
		logger.info(reqData);
		next();
	}
}
