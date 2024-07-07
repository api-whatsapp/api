import "dotenv/config";
import supertest from "supertest";
import { web } from "../../../src/main/server/app";

const user_token = process.env.TEST_USER_TOKEN;
const member_token = process.env.TEST_MEMB_TOKEN;
const premium_token = process.env.TEST_PREM_TOKEN;

describe("GET /v1", function () {
	it("should return 200 OK", async () => {
		const result = await supertest(web)
			.get("/v1/")
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", `Bearer ${user_token}`);
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 200 OK", async () => {
		const result = await supertest(web)
			.get("/v1/")
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", `Bearer ${member_token}`);
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 200 OK", async () => {
		const result = await supertest(web)
			.get("/v1/")
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", `Bearer ${premium_token}`);
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 401 Unauthorized", async () => {
		const result = await supertest(web)
			.get("/v1/")
			.set("Accept", "application/json;charset=utf-8");
		expect(result.status).toBe(401);
		expect(result.body.message).toContain("Missing API token.");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 403 Forbidden", async () => {
		const result = await supertest(web)
			.get("/v1/")
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", "Bearer");
		expect(result.status).toBe(403);
		expect(result.body.message).toContain("Invalid API token.");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 429 Too Many Requests", async () => {
		let result;
		for (let i = 0; i < 120; i++) {
			result = await supertest(web)
				.get("/v1/")
				.set("Accept", "application/json;charset=utf-8")
				.set("Authorization", `Bearer ${user_token}`);
		}
		expect(result.status).toBe(429);
		expect(result.body.message).not.toBeNull();
	}, 60000);
});
