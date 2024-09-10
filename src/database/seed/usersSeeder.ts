import type { UserLevel } from "@prisma/client";

export const usersSeeder: {
	email: string;
	quota: number;
	token: string;
	password: string;
	level: UserLevel;
}[] = [
	{
		email: "a@a.com",
		quota: 100,
		token: "1121",
		password: "$2a$12$fxLIC.j7zwCJnCgbNwvzjek1levSIhvale1Y8cpiRjPsGuZquOS02",
		level: "user",
	},
	{
		email: "b@b.com",
		quota: 100,
		token: "1122",
		password: "$2a$12$fxLIC.j7zwCJnCgbNwvzjek1levSIhvale1Y8cpiRjPsGuZquOS02",
		level: "member",
	},
	{
		email: "c@c.com",
		quota: 100,
		token: "1123",
		password: "$2a$12$fxLIC.j7zwCJnCgbNwvzjek1levSIhvale1Y8cpiRjPsGuZquOS02",
		level: "premium",
	},
	{
		email: "n@o.com",
		quota: 100,
		token: "404",
		password: "$2a$12$fxLIC.j7zwCJnCgbNwvzjek1levSIhvale1Y8cpiRjPsGuZquOS02",
		level: "premium",
	},
];
