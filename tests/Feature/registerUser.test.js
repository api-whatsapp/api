import supertest from "supertest";
import { app } from "../../src/app/api.js";
import { prismaClient } from "../../src/app/database.js";

const email = process.env.EXAMPLE_EMAIL;

describe("POST /users", function () {
	afterEach(async () => {
		await prismaClient.user.deleteMany({
			where: {
				email: email,
			},
		});
	});

	it("201 Created", async function () {
		const result = await supertest(app)
			.post("/users")
			.set("Accept", "application/json;charset=utf-8")
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
		let result = await supertest(app)
			.post("/users")
			.set("Accept", "application/json;charset=utf-8")
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

		result = await supertest(app)
			.post("/users")
			.set("Accept", "application/json;charset=utf-8")
			.send({
				email: email,
			});

		expect(result.status).toBe(400);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("User already exists");
	});

	it("400 Email is a required", async function () {
		const result = await supertest(app).post("/users");

		expect(result.status).toBe(400);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("email is a required");
	});

	it("400 Email should be a type of string", async function () {
		const result = await supertest(app)
			.post("/users")
			.set("Accept", "application/json;charset=utf-8")
			.send({
				email: 1235,
			});

		expect(result.status).toBe(400);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("email should be a type of string");
	});

	it("400 Email must be a valid email", async function () {
		const result = await supertest(app)
			.post("/users")
			.set("Accept", "application/json;charset=utf-8")
			.send({
				// file deepcode ignore NoHardcodedCredentials/test: for negative test
				email: "1235",
			});

		expect(result.status).toBe(400);
		expect(result.body).not.toBeNull();
		expect(result.body.message).toContain("must be a valid email");
	});
});
