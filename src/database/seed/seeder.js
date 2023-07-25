/* eslint-disable no-console */
import { logs } from "./logSeeder.js";
import { messages } from "./messageSeeder.js";
import { PrismaClient } from "@prisma/client";
import { hardwares } from "./hardwareSeeder.js";
const prisma = new PrismaClient();

const load = async () => {
	const tableNames = ["hardwares", "users", "messages", "devices", "logs"];

	try {
		for (const tableName of tableNames) {
			await prisma.$queryRawUnsafe("SET FOREIGN_KEY_CHECKS = 0;");
			await prisma.$queryRawUnsafe(`TRUNCATE TABLE ${tableName};`);
			await prisma.$queryRawUnsafe("SET FOREIGN_KEY_CHECKS = 1;");
		}

		await prisma.hardware.createMany({
			data: hardwares,
		});
		console.log("Added hardwares data");

		await prisma.message.createMany({
			data: messages,
		});
		console.log("Added messages data");

		await prisma.log.createMany({
			data: logs,
		});
		console.log("Added logs data");
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
};

load();
