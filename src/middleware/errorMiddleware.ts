import { ZodError } from "zod";
import { ResponseError } from "../errors/responseErrors";
import type { NextFunction, Request, Response } from "express";

/*eslint-disable @typescript-eslint/no-unused-vars -- next used as middleware for NextFunction */
export const ErrorMiddleware = async (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error instanceof ZodError) {
		res
			.status(400)
			.json({
				errors: error.issues,
			})
			.end();
	} else if (error instanceof ResponseError) {
		res
			.status(error.status)
			.json({
				errors: error.message,
			})
			.end();
	} else {
		/* istanbul ignore next */
		res
			.status(500)
			.json({
				message: error.message || "Internal Server Error",
			})
			.end();
	}
};
