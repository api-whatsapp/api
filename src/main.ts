import "dotenv/config";
import { web } from "./main/server/app";
import { logger as log } from "./config/logger";
import { prismaClient } from "./config/database";
import { connectToWhatsApp } from "./modules/whatsapp";

process.env.TZ = "Asia/Jakarta";

const port: string = process.env.API_PORT ?? "3030";

const server = web.listen(port, () => {
	try {
		log.info(`App run on http://127.0.0.1:${port}`);
		connectToWhatsApp().catch((e) => log.error(`unexpected error: ${e}`));
	} catch (error) {
		log.error(`Failed to start the server ${error}`);
		process.exitCode = 1;
	}
});

process.on("SIGINT", gracefulShutdown);

process.on("SIGTERM", gracefulShutdown);

process.on("SIGHUP", async () => {
	await prismaClient.$disconnect();
	process.kill(process.pid, "SIGTERM");
});

process.on("unhandledRejection", (error: Error) => {
	log.error(`Unhandled Rejection: ${error.message || error}`);
	gracefulShutdown();
	// errorHandler.handleError(error);
});

process.on("uncaughtException", (err) => {
	log.fatal(err, "uncaught exception detected");
	gracefulShutdown();
});

export function gracefulShutdown(): void {
	log.info("SIGTERM/SIGINT signal received: closing HTTP server");
	log.info("Shutting down gracefully...");

	server.close(async () => {
		log.info("HTTP server closed");
		await prismaClient.$disconnect();
		// Close any other connections or resources here
		process.exitCode = 0;
	});
}
