import type { User } from "@prisma/client";
import { toUserResponse, UserData } from "./userModel";

export type LoginRq = {
	email: string;
	password: string;
};

export type LoginResponse = {
	data: UserData;
	token: string;
};

export function toJwtPayload(user: User): UserData {
	return {
		id: user.id,
		email: user.email,
		level: user.level,
	};
}

export function toLoginResponse(user: User, token: string): LoginResponse {
	return {
		data: toUserResponse(user),
		token: token,
	};
}
