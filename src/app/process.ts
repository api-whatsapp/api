import { logger as log } from "./config/logger";
import { gracefulShutdown } from "../main";

// process.on("SIGINT", gracefulShutdown);

// process.on("SIGTERM", gracefulShutdown);

// process.on("SIGHUP", async () => {
// 	await prismaClient.$disconnect();
// 	process.kill(process.pid, "SIGTERM");
// });

process.on("unhandledRejection", (error: Error) => {
	log.error(`Unhandled Rejection: ${error.message || error}`);
	gracefulShutdown();
	// errorHandler.handleError(error);
});

process.on("uncaughtException", (err) => {
	log.fatal(err, "uncaught exception detected");
	gracefulShutdown();
});
