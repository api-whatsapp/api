import { server } from "../main";
import { logger } from "../config/logger";

export class Process {
	public gracefulShutdown(): void {
		logger.info("SIGTERM/SIGINT signal received: closing HTTP server");
		logger.info("Shutting down gracefully...");
		server.stop();
	}
}

const gracefulShutdown = new Process();

// process.on("unhandledRejection", (error: Error) => {
// 	logger.error(`Unhandled Rejection: ${error.message || error}`);
// 	gracefulShutdown.gracefulShutdown();
// 	// errorHandler.handleError(error);
// });

// process.on("uncaughtException", (err) => {
// 	logger.fatal(err, "uncaught exception detected");
// 	gracefulShutdown.gracefulShutdown();
// });
