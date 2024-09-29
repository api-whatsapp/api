import "./process";
import http from "http";
import { config } from "dotenv";
import { logger } from "../config/logger";
import { ExpressServer } from "./expressServer";
import { prismaClient } from "../config/database";
import { SessionHandler } from "../handler/sessionHandler";

config();

export class AppServer {
	private server: http.Server;
	private httpServer: ExpressServer;
	private sessionHandler: SessionHandler;
	private port: number = Number(process.env.PORT ?? 3030);

	constructor() {
		this.httpServer = new ExpressServer();
		this.sessionHandler = new SessionHandler();
		this.server = http.createServer(this.httpServer.getApp());
	}

	public async start(): Promise<void> {
		this.server.listen(this.port, async () => {
			try {
				logger.info(`App run on http://127.0.0.1:${this.port}`);

				await this.sessionHandler
					.init()
					.catch((e) => logger.error(`connectToWhatsApp error: ${e}`));
			} catch (error) {
				logger.error(`Failed to start the server ${error}`);
				process.exitCode = 1;
			}
		});
	}

	public stop() {
		this.server.close(async () => {
			logger.info("HTTP server closed");
			await prismaClient.$disconnect();
			process.exitCode = 0;
		});
	}
}
