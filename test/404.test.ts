import supertest from "supertest";
import { web } from "../src/app/web";

function genrateURL() {
	let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let charLength = chars.length;
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
			.set("Authorization", "Bearer 1121");
		expect(result.status).toBe(404);
		expect(result.body.message).not.toBeNull();
	});

	it("404 Not Found V1", async () => {
		const result = await supertest(web)
			.get("/v1/" + genrateURL())
			.set("Accept", "application/json;charset=utf-8")
			.set("Authorization", "Bearer 1121");
		expect(result.status).toBe(404);
		expect(result.body.message).not.toBeNull();
	});
});
