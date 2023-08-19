import { ResponseError } from "../errors/responseErrors.js";

export const errorMiddleware = async (error, _req, res, next) => {
	if (!error) {
		next();
		return;
	}
	if (error instanceof ResponseError) {
		res
			.status(error.status)
			.json({
				message: error.message,
			})
			.end();
	} else {
		res
			.status(error.status || 500)
			.json({
				message: error.message || "Internal Server Error",
			})
			.end();
	}
};
