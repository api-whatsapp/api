import "dotenv/config";
import { web } from "./app/web";
import { logger } from "./app/logger";

const port: string = process.env.API_PORT ?? "3030";

const server = web.listen(port, () => {
	logger.info(`App run on http://127.0.0.1:${port}`);
});

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

function gracefulShutdown(): void {
	logger.info("SIGTERM/SIGINT signal received: closing HTTP server");
	logger.info("Shutting down gracefully...");

	server.close(() => {
		logger.info("HTTP server closed");
		// Close any other connections or resources here
		process.exit(0);
	});

	// Force close the server after 5 seconds
	setTimeout(() => {
		console.error(
			"Could not close connections in time, forcefully shutting down"
		);
		process.exit(1);
	}, 5000);
}
