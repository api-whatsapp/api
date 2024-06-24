import { PrismaClient } from "@prisma/client";
import { usersSeeder } from "./usersSeeder";
import { deviceSeeder } from "./deviceSeeder";

const prisma = new PrismaClient();

const tableNames = ["users"];

try {
	await prisma.device.deleteMany();
	await prisma.user.deleteMany();
	for (const tableName of tableNames) {
		await prisma.$queryRawUnsafe("SET FOREIGN_KEY_CHECKS = 0;");
		await prisma.$queryRawUnsafe(`TRUNCATE TABLE ${tableName};`);
		await prisma.$queryRawUnsafe("SET FOREIGN_KEY_CHECKS = 1;");
	}
	await prisma.user.createMany({
		data: usersSeeder,
	});
	await prisma.device.createMany({
		data: deviceSeeder,
	});
	const dev = await prisma.device.count();
	const usr = await prisma.user.count();
	console.log(`There are ${dev} device and ${usr} user in the database.`);
	await prisma.$disconnect();
	process.exit(0);
} catch (error) {
	console.error(error);
	process.exit(1);
} finally {
	await prisma.$disconnect();
}
