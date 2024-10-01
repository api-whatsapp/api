import "./process";
import http from "http";
import { config } from "dotenv";
import { logger } from "../config/logger";
import Database from "../config/database";
import ExpressServer from "./expressServer";

config();

export default class AppServer {
	private readonly prismaClient;
	private readonly database: Database;
	private readonly server: http.Server;
	private readonly httpServer: ExpressServer;
	private readonly port: number = Number(process.env.PORT ?? 3030);

	constructor() {
		this.database = new Database();
		this.httpServer = new ExpressServer();
		this.prismaClient = this.database.getDB();
		this.server = http.createServer(this.httpServer.getApp());
	}

	public async start(): Promise<void> {
		try {
			this.server.listen(this.port, async () => {
				logger.info(`App run on http://127.0.0.1:${this.port}`);
			});
		} catch (error) {
			logger.error(`Failed to start the server ${error}`);
			process.exitCode = 1;
		}
	}

	public stop() {
		this.server.close(async () => {
			logger.info("HTTP server closed");
			await this.prismaClient.$disconnect();
			process.exitCode = 0;
		});
	}
}
