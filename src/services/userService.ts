import { v7 as uuidv7 } from "uuid";
import { prismaClient } from "../config/database";
import { ResponseError } from "../errors/responseErrors";
import {
	toUserResponse,
	type CreateUserRequest,
	type UserResponse,
} from "../models/userModel";
import { UserValidation } from "../validation/userValidation";
import { Validation } from "../validation/validation";

export class UserService {
	static async register(request: CreateUserRequest): Promise<UserResponse> {
		const registerRequest = Validation.validate(
			UserValidation.REGISTER,
			request
		);

		const userExists: number | null = await prismaClient.user.count({
			where: {
				email: registerRequest.email,
			},
		});

		if (userExists != 0) {
			throw new ResponseError(400, "Email already exists");
		}

		const uuid = uuidv7();
		const email = registerRequest.email.split("@")[0];
		const token = `${uuid}@${email}`;

		const user = await prismaClient.user.create({
			data: {
				email: registerRequest.email,
				token: token,
			},
		});

		return toUserResponse(user);
	}
}
