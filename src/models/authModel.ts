import type { User } from "@prisma/client";

export type LoginResponse = {
	email: string;
	token?: string;
};

export type LoginRq = {
	email: string;
	password: string;
};

export function toLoginResponse(user: User): LoginResponse {
	return {
		email: user.email,
		token: user.token,
	};
}
