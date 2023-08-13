import { api } from "../../src/app/api.js";
import supertest from "supertest";

describe("404 Test", function () {
	for (let index = 1; index <= 5; index++) {
		it(index + ". 404 Not Found", async function () {
			var chars =
				"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			var charLength = chars.length;
			var url = "";
			for (var i = 0; i < 10; i++) {
				url += chars.charAt(Math.floor(Math.random() * charLength));
			}

			const result = await supertest(api)
				.get("/" + url)
				.set("Accept", "application/json")
				.set("Authorization", "Bearer 404");
			expect(result.status).toBe(404);
			expect(result.body.message).toContain("Not Found");
		});
	}
});
