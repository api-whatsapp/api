import supertest from "supertest";
import { web } from "../../src/app/web";

describe("GET /", function () {
	it("200 without vaild Token", async () => {
		const result = await supertest(web)
			.get("/")
			.set("Accept", "application/json;charset=utf-8");
		expect(result.status).toBe(200);
		expect(result.body.message).not.toBeNull();
		expect(result.body.version).not.toBeNull();
		expect(result.body.stability).not.toBeNull();
	});
});
