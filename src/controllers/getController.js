import { logger } from "../app/logger.js";
import { prismaClient } from "../app/database.js";

const check = await prismaClient.device.findMany({
	select: {
		device_id: true,
	},
});

check.forEach(myFunction);

function myFunction(item) {
	logger.info(item["device_id"]);
}
