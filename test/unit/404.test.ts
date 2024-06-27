import "dotenv/config";
import supertest from "supertest";
import { web } from "../../src/app/web";

const user_token = process.env.TEST_USER_TOKEN;
const member_token = process.env.TEST_MEMB_TOKEN;

function genrateURL() {
	const chars =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	const charLength = chars.length;
	let url = "";
	for (let i = 0; i < 10; i++) {
		url += chars.charAt(Math.floor(Math.random() * charLength));
	}
	return url;
}

describe("404 Test", () => {
	it("404 Not Found", async () => {
		const result = await supertest(web)
			.get("/" + genrateURL())
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", `Bearer ${user_token}`);
		expect(result.status).toBe(404);
		expect(result.body.message).not.toBeNull();
	});

	it("404 Not Found V1", async () => {
		const result = await supertest(web)
			.get("/v1/" + genrateURL())
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", `Bearer ${member_token}`);
		expect(result.status).toBe(404);
		expect(result.body.message).not.toBeNull();
	});
});
