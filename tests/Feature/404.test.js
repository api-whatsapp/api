import { api } from "../../src/app/api.js";
import supertest from "supertest";

describe("404 Test", function () {
	it("should return 404 Not Found", async function () {
		const result = await supertest(api)
			.get("/asmlckasm")
			.set("Accept", "application/json");
		expect(result.status).toBe(404);
		expect(result.body.message).toContain("Not Found");
	});

	it("should return 404 Not Found", async function () {
		const result = await supertest(api)
			.post("/asmlckasm")
			.set("Accept", "application/json");
		expect(result.status).toBe(404);
		expect(result.body.message).toContain("Not Found");
	});
});
