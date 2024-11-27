import http from "http";
import { config } from "dotenv";
import ExpressServer from "./expressServer";
import { prismaClient } from "../configs/database";

config();

export default class AppServer {
	private readonly server: http.Server;
	private readonly httpServer: ExpressServer;
	private readonly port: number = Number(process.env.PORT ?? 3030);

	constructor() {
		this.httpServer = new ExpressServer();
		this.server = http.createServer(this.httpServer.getApp());
	}

	public async start(): Promise<void> {
		try {
			this.server.listen(this.port, async () => {
				console.log(`App run on http://127.0.0.1:${this.port}`);
			});
		} catch (error) {
			console.error(`Failed to start the server ${error}`);
			process.exitCode = 1;
		}
	}

	public stop() {
		this.server.close(async () => {
			console.log("HTTP server closed");
			await prismaClient.$disconnect();
			process.exitCode = 0;
		});
	}
}
