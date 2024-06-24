import type { User } from "@prisma/client";

export type UserResponse = {
	email: string;
	token?: string;
};

export type CreateUserRequest = {
	email: string;
	name: string;
};

export function toUserResponse(user: User): UserResponse {
	return {
		email: user.email,
		token: user.token,
	};
}
