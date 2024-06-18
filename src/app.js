import "dotenv/config";
import { app } from "./app/api.js";
import { logger } from "./app/logger.js";

const port = process.env.API_PORT || 3030;
global.host = process.env.API_HOST || "https://pakaiwa.my.id";

const server = app.listen(port, () => {
	logger.info(`App run on port ${port}`);
});

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

function gracefulShutdown() {
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
