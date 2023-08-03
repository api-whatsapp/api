/* eslint-disable no-console */
import { logger } from "../../app/logger.js";
import { PrismaClient } from "@prisma/client";
import { usersSeeder } from "./usersSeeder.js";
import { deviceSeeder } from "./deviceSeeder.js";
const prisma = new PrismaClient();

const load = async () => {
	const tableNames = ["users"];
	try {
		for (const tableName of tableNames) {
			await prisma.$queryRawUnsafe("SET FOREIGN_KEY_CHECKS = 0;");
			await prisma.$queryRawUnsafe(`TRUNCATE TABLE ${tableName};`);
			await prisma.$queryRawUnsafe("SET FOREIGN_KEY_CHECKS = 1;");
		}
		await prisma.user.createMany({
			data: usersSeeder,
		});
		logger.info("Added users data");
		await prisma.device.createMany({
			data: deviceSeeder,
		});
		logger.info("Added device data");
	} catch (e) {
		logger.error(e);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
};

load();
