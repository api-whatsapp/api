import type { User, UserLevel } from "@prisma/client";

export type UserData = {
	id: number;
	email: string;
	quota: number;
	level: UserLevel;
	created_at: Date;
	last_request: Date | null;
};

export type CreateUserRequest = {
	email: string;
	name: string;
};

export function toUserResponse(user: User): UserData {
	return {
		id: user.id,
		email: user.email,
		quota: user.quota,
		level: user.level,
		created_at: user.created_at,
		last_request: user.last_request,
	};
}
