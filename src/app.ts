import "dotenv/config";
import { web } from "./main/server/app";
import { logger } from "./config/logger";
import { prismaClient } from "./config/database";

const port: string = process.env.API_PORT ?? "3030";

const server = web.listen(port, () => {
	logger.info(`App run on http://127.0.0.1:${port}`);
});

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("SIGHUP", async () => {
	await prismaClient.$disconnect();
	process.kill(process.pid, "SIGTERM");
});
function gracefulShutdown(): void {
	logger.info("SIGTERM/SIGINT signal received: closing HTTP server");
	logger.info("Shutting down gracefully...");

	server.close(async () => {
		logger.info("HTTP server closed");
		await prismaClient.$disconnect();
		// Close any other connections or resources here
		process.exit(0);
	});

	// Force close the server after 5 seconds
	setTimeout(async () => {
		console.error(
			"Could not close connections in time, forcefully shutting down"
		);
		await prismaClient.$disconnect();
		process.exit(1);
	}, 5000);
}
