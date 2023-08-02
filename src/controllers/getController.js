/* eslint-disable no-console */
import { prismaClient } from "../app/database.js";

const check = await prismaClient.hardware.findMany({
	select: {
		name: true,
	},
});

check.forEach(myFunction);

function myFunction(item) {
	console.info(item["name"]);
}
