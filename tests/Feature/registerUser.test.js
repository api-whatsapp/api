import supertest from "supertest";
import { api } from "../../src/app/api.js";
import { prismaClient } from "../../src/app/database.js";

const email = "kelvin@anggara.com";

describe("POST /users", function () {
	afterEach(async () => {
		await prismaClient.user.deleteMany({
			where: {
				email: email,
			},
		});
	});

	it("201 Created", async function () {
		const result = await supertest(api)
			.post("/users")
			.set("Accept", "application/json")
			.send({
				email: email,
			});

		expect(result.status).toBe(201);
		expect(result.body).not.toBeNull();
		expect(result.body.data.email).toBe(email);
		expect(result.body.data.quota >= 0).toBeTruthy();
		expect(result.body.data.level).toBe("user");
		expect(result.body.data.token).not.toBeNull();
		expect(result.body.data.created_at).not.toBeNull();
		expect(result.body.data.last_request).not.toBeNull();
	});

	it("400 User already exists", async function () {
		let result = await supertest(api)
			.post("/users")
			.set("Accept", "application/json")
			.send({
				email: email,
			});

		expect(result.status).toBe(201);
		expect(result.body).not.toBeNull();
		expect(result.body.data.email).toBe(email);
		expect(result.body.data.quota >= 0).toBeTruthy();
		expect(result.body.data.level).toBe("user");
		expect(result.body.data.token).not.toBeNull();
		expect(result.body.data.created_at).not.toBeNull();
		expect(result.body.data.last_request).not.toBeNull();

		result = await supertest(api)
			.post("/users")
			.set("Accept", "application/json")
			.send({
				email: email,
			});

		expect(result.status).toBe(400);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("User already exists");
	});

	it("400 Email is a required", async function () {
		const result = await supertest(api).post("/users");

		expect(result.status).toBe(400);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("email is a required");
	});

	it("400 Email should be a type of string", async function () {
		const result = await supertest(api)
			.post("/users")
			.set("Accept", "application/json")
			.send({
				email: 1235,
			});

		expect(result.status).toBe(400);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("email should be a type of string");
	});

	it("400 Email must be a valid email", async function () {
		const result = await supertest(api)
			.post("/users")
			.set("Accept", "application/json")
			.send({
				email: "1235",
			});

		expect(result.status).toBe(400);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("must be a valid email");
	});

	it("429 Too many requests", async function () {
		for (let i = 7; i <= 10; i++) {
			const result = await supertest(api)
				.post("/users")
				.set("Accept", "application/json")
				.send({
					email: email,
				});

			await prismaClient.user.deleteMany({
				where: {
					email: email,
				},
			});

			expect(result.status).toBe(201);
			expect(result.body).not.toBeNull();
			expect(result.body.data.email).toBe(email);
			expect(result.body.data.quota >= 0).toBeTruthy();
			expect(result.body.data.level).toBe("user");
			expect(result.body.data.token).not.toBeNull();
			expect(result.body.data.created_at).not.toBeNull();
			expect(result.body.data.last_request).not.toBeNull();
		}

		const result = await supertest(api)
			.post("/users")
			.set("Accept", "application/json")
			.send({
				email: email,
			});

		expect(result.status).toBe(429);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("Too many requests");
	});
});
