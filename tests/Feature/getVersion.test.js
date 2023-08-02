import { api } from "../../src/app/api.js";
import supertest from "supertest";

describe("GET /", function () {
	it("should return 200 OK", async function () {
		const result = await supertest(api)
			.get("/")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1122");
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 200 OK", async function () {
		const result = await supertest(api)
			.get("/")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1122");
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 200 OK", async function () {
		const result = await supertest(api)
			.get("/")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1123");
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 403 Forbidden", async function () {
		const result = await supertest(api)
			.get("/")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 112233");
		expect(result.status).toBe(403);
		expect(result.body.message).toContain("Invalid API token.");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 401 Unauthorized", async function () {
		const result = await supertest(api)
			.get("/")
			.set("Accept", "application/json");
		expect(result.status).toBe(401);
		expect(result.body.message).toContain("Missing API token.");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 404 Not Found", async function () {
		const result = await supertest(api)
			.post("/")
			.set("Accept", "application/json");
		expect(result.status).toBe(404);
		expect(result.body.message).toContain("Not Found");
	});

	it("should return 429 Too Many Requests", async function () {
		let result;
		for (let i = 0; i < 120; i++) {
			result = await supertest(api)
				.get("/")
				.set("Accept", "application/json")
				.set("Authorization", "Bearer 1121");
		}
		expect(result.status).toBe(429);
		expect(result.body.message).toContain("Too many requests");
	});
});
