import { api } from "../../src/app/api.js";
import supertest from "supertest";
import { prismaClient } from "../../src/app/database.js";

const device_id = "1234567890";

describe("POST /devices", function () {
	afterEach(async () => {
		const user = await prismaClient.user.findUnique({
			where: {
				token: "1122",
			},
			select: {
				email: true,
			},
		});
		await prismaClient.device.deleteMany({
			where: {
				userEmail: user.email,
			},
		});
	});

	it("should return 201 Created", async function () {
		const result = await supertest(api)
			.post("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1122")
			.send({
				device_id: device_id,
			});
		expect(result.status).toBe(201);
		expect(result.body).not.toBeNull();
		expect(result.body.id).toBe(device_id);
		expect(result.body.status).toBe("disconnected");
		expect(result.body.created_at).toBeDefined();
		expect(result.body.meta.location).toContain(device_id);
	});

	it("Device id already exists 400 Bad Request", async function () {
		let result = await supertest(api)
			.post("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1122")
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
			.post("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1122")
			.send({
				device_id: device_id,
			});
		expect(result.status).toBe(400);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Device id already exists");
	});

	it("Missing device_id 400 Bad Request", async function () {
		const result = await supertest(api)
			.post("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer 1122")
			.send({});
		expect(result.status).toBe(400);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Missing device_id");
	});

	it("Missing API token 401 Unauthorized", async function () {
		const result = await supertest(api)
			.post("/devices")
			.set("Accept", "application/json")
			.send({
				device_id: device_id,
			});
		expect(result.status).toBe(401);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Missing API token.");
	});

	it("Invalid API token 403 Forbidden", async function () {
		const result = await supertest(api)
			.post("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer xxxx")
			.send({
				device_id: device_id,
			});
		expect(result.status).toBe(403);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Invalid API token.");
	});

	it("Invalid API token 403 Forbidden", async function () {
		const result = await supertest(api)
			.post("/devices")
			.set("Accept", "application/json")
			.set("Authorization", "Bearer")
			.send({
				device_id: device_id,
			});
		expect(result.status).toBe(403);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Invalid API token.");
	});
});
