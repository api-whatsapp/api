/* eslint-disable @typescript-eslint/no-unused-vars -- next used as middleware for NextFunction */
import { ZodError } from "zod";
import { ResponseError } from "../errors/responseErrors";
import type { NextFunction, Request, Response } from "express";

export default class ErrorMiddleware {
	static notFound(req: Request, res: Response, next: NextFunction) {
		res.status(404).json({ message: "Resource not found" });
	}

	static serverError(
		error: Error,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		res.status(500).json({ message: error.message });
	}

	static generalError(
		error: Error,
		req: Request,
		res: Response,
		next: NextFunction
	) {
		/* istanbul ignore else */
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
			res
				.status(500)
				.json({
					message: error.message || "Internal Server Error",
				})
				.end();
		}
	}
}
