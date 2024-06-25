import "dotenv/config";
import supertest from "supertest";
import { web } from "../src/app/web";
import { prismaClient } from "../src/app/database";

const email = process.env.EXAMPLE_EMAIL;

describe("POST /users", () => {
	afterEach(async () => {
		await prismaClient.user.deleteMany({
			where: {
				email: email,
			},
		});
	});

	it("400 Name & Email is a required", async () => {
		const result = await supertest(web).post("/users");
		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it("400 Name is a required", async () => {
		const result = await supertest(web)
			.post("/users")
			.set("Accept", "application/json;charset=utf-8")
			.send({
				email: email,
			});
		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it("400 Email is a required", async () => {
		const result = await supertest(web)
			.post("/users")
			.set("Accept", "application/json;charset=utf-8")
			.send({
				name: "namexxxxx",
			});
		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it("400 Email already exists", async () => {
		let result = await supertest(web)
			.post("/users")
			.set("Accept", "application/json;charset=utf-8")
			.send({
				name: "namexxxxx",
				email: email,
			});
		expect(result.status).toBe(201);
		expect(result.body.data).toBeDefined();
		expect(result.body.data.email).toMatch(/(@)/i);
		expect(result.body.data.token).toBeDefined();
		expect(result.body.errors).toBeUndefined();

		result = await supertest(web)
			.post("/users")
			.set("Accept", "application/json;charset=utf-8")
			.send({
				name: "namexxxxx",
				email: email,
			});
		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it("201 Register Success", async () => {
		const result = await supertest(web)
			.post("/users")
			.set("Accept", "application/json;charset=utf-8")
			.send({
				name: "namexxxxx",
				email: email,
			});
		expect(result.status).toBe(201);
		expect(result.body.data).toBeDefined();
		expect(result.body.data.email).toMatch(/(@)/i);
		expect(result.body.data.token).toBeDefined();
		expect(result.body.errors).toBeUndefined();
	});
});
