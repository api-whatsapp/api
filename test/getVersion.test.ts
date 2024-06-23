import supertest from "supertest";
import { web } from "../src/app/web";

describe("GET /", function () {
	it("should return 200 OK", async function () {
		const result = await supertest(web)
			.get("/")
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", "Bearer 1122");
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 200 OK", async function () {
		const result = await supertest(web)
			.get("/")
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", "Bearer 1122");
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("should return 200 OK", async function () {
		const result = await supertest(web)
			.get("/")
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", "Bearer 1123");
		expect(result.status).toBe(200);
		expect(result.body.message).toContain("PakaiWA.my.id");
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});

	it("200 without vaild Token", async function () {
		const result = await supertest(web)
			.get("/")
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", "Bearer");
		expect(result.status).toBe(200);
		expect(result.body.message).not.toBeNull();
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});
});
