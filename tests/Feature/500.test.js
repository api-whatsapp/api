import supertest from "supertest";
import { api } from "../../src/app/api.js";
import { prismaClient } from "../../src/app/database.js";

const email = "kelvin@anggara.com";
describe("POST /users", function () {
	afterEach(async () => {
		await prismaClient.user.deleteMany({
			where: {
				email: email,
			},
		});
	});

	it("500 Internal Server Error", async function () {
		const result = await supertest(api)
			.post("/users")
			.set("Accept", "application/json")
			.expect("Content-Type", "application/json; charset=utf-8")
			.send({
				email: email,
			});

		expect(result.body).not.toBeNull();
	});
});
