import { api } from "../../src/app/api.js";
import supertest from "supertest";

describe("GET /devices", function () {
	it("Device Get 200 OK", async function () {
		const result = await supertest(api)
			.get("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1121");
		expect(result.status).toBe(200);
		expect(result.body).not.toBeNull();
	});

	it("Missing API token 401 Unauthorized", async function () {
		const result = await supertest(api)
			.get("/devices")
			.set("Accept", "application/json");

		expect(result.status).toBe(401);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Missing API token.");
	});

	it("Invalid API token 403 Forbidden", async function () {
		const result = await supertest(api)
			.get("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer xxxx");

		expect(result.status).toBe(403);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Invalid API token.");
	});

	it("Invalid API token 403 Forbidden", async function () {
		const result = await supertest(api)
			.get("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer");

		expect(result.status).toBe(403);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Invalid API token.");
	});

	it("Device Lon Found 404 Not Found", async function () {
		const result = await supertest(api)
			.get("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 404");
		expect(result.status).toBe(404);
		expect(result.body).not.toBeNull();
	});
});
