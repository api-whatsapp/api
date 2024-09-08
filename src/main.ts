import "dotenv/config";
import { app } from "./app/server";
import { logger as log } from "./config/logger";
import { prismaClient } from "./config/database";
import { init } from "./mediation/whatsapp";

process.env.TZ = "Asia/Jakarta";

const port: number = Number(process.env.PORT ?? 3030);

const server = app.listen(port, async () => {
	try {
		log.info(`App run on http://127.0.0.1:${port}`);
		await init();
		// connectToWhatsApp().catch((e) =>
		// 	log.error(`connectToWhatsApp error: ${e}`)
		// );
	} catch (error) {
		log.error(`Failed to start the server ${error}`);
		process.exitCode = 1;
	}
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
