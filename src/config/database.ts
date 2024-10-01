import { logger } from "./logger";
import { PrismaClient } from "@prisma/client";

export default class Database {
	private readonly prismaClient;

	constructor() {
		this.prismaClient = new PrismaClient({
			log: [
				{
					emit: "event",
					level: "query",
				},
				{
					emit: "event",
					level: "error",
				},
				{
					emit: "event",
					level: "info",
				},
				{
					emit: "event",
					level: "warn",
				},
			],
		});

		/* istanbul ignore next */
		this.prismaClient.$on("error", (e) => {
			logger.error(e);
		});
		/* istanbul ignore next */
		this.prismaClient.$on("warn", (e) => {
			logger.warn(e);
		});

		this.prismaClient.$on("info", (e) => {
			logger.info(e);
		});

		this.prismaClient.$on("query", (e) => {
			logger.query("Query: " + e.query);
			logger.query("Params: " + e.params);
			logger.query("Duration: " + e.duration + " ms");
		});
	}

	public getDB() {
		return this.prismaClient;
	}
}
