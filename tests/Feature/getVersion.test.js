import supertest from "supertest";
import { app } from "../../src/app/api.js";

describe("GET /", function () {
	it("should return 200 OK", async function () {
		const result = await supertest(app)
			.get("/")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1122");
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 200 OK", async function () {
		const result = await supertest(app)
			.get("/")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1122");
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 200 OK", async function () {
		const result = await supertest(app)
			.get("/")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1123");
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("200 without vaild Token", async function () {
		const result = await supertest(app)
			.get("/")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer");
		expect(result.status).toBe(200);
		expect(result.body.message).not.toBeNull();
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 429 Too Many Requests", async function () {
		let result;
		for (let i = 0; i < 120; i++) {
			result = await supertest(app)
				.get("/")
				.set("Accept", "application/json")
				.set("Authorization", "Bearer 1121");
		}
		expect(result.status).toBe(429);
		expect(result.body.message).not.toBeNull();
	}, 60000);
});
