import type { UserLevel } from "@prisma/client";

export const usersSeeder: {
	email: string;
	quota: number;
	token: string;
	password: string;
	level: UserLevel;
}[] = [
	{
		email: "a@a.a",
		quota: 100,
		token: "1121",
		password: "1121",
		level: "user",
	},
	{
		email: "b@b.b",
		quota: 100,
		token: "1122",
		password: "1122",
		level: "member",
	},
	{
		email: "c@c.c",
		quota: 100,
		token: "1123",
		password: "1123",
		level: "premium",
	},
	{
		email: "n@o.t",
		quota: 100,
		token: "404",
		password: "404",
		level: "premium",
	},
];
