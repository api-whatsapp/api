import { api } from "../../src/app/api.js";
import supertest from "supertest";

const device_id = "1234567890";

describe("DELETE /devices/DEVICE_ID", function () {
	it("Device Get 204 OK", async function () {
		let result = await supertest(api)
			.post("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1121")
			.send({
				device_id: device_id,
			});
		expect(result.status).toBe(201);
		expect(result.body).not.toBeNull();
		expect(result.body.id).toBe(device_id);
		expect(result.body.status).toBe("disconnected");
		expect(result.body.created_at).toBeDefined();
		expect(result.body.meta.location).toContain(device_id);

		result = await supertest(api)
			.delete(`/devices/${device_id}`)
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1121");
		expect(result.status).toBe(204);
	});

	it("Missing API token 401 Unauthorized", async function () {
		const result = await supertest(api)
			.delete(`/devices/${device_id}`)
			.set("Accept", "application/json");

		expect(result.status).toBe(401);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Missing API token.");
	});

	it("Invalid API token 403 Forbidden", async function () {
		const result = await supertest(api)
			.delete(`/devices/${device_id}`)
			.set("Accept", "application/json")
			.set("Authorization", "Bearer xxxx");

		expect(result.status).toBe(403);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Invalid API token.");
	});

	it("Invalid API token 403 Forbidden", async function () {
		const result = await supertest(api)
			.delete(`/devices/${device_id}`)
			.set("Accept", "application/json")
			.set("Authorization", "Bearer");

		expect(result.status).toBe(403);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Invalid API token.");
	});

	it("Device Not Found 404 Not Found", async function () {
		const result = await supertest(api)
			.delete(`/devices/${device_id}`)
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1121");
		expect(result.status).toBe(404);
		expect(result.body).not.toBeNull();
	});
});
