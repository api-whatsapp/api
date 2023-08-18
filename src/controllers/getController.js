import { logger } from "../app/logger.js";
import { prismaClient } from "../app/database.js";

const check = await prismaClient.hardware.findMany({
	select: {
		name: true,
	},
});

check.forEach(myFunction);

function myFunction(item) {
	logger.info(item["name"]);
}
