import bcrypt from "bcrypt";
import { prismaClient } from "../config/database";
import { ResponseError } from "../errors/responseErrors";
import {
	toLoginResponse,
	type LoginRq,
	type LoginResponse,
} from "../models/authModel";
import { Validation } from "../validation/validation";
import { User } from "@prisma/client";
import { AuthValidation } from "../validation/authValidation";

export class AuthService {
	static async login(request: LoginRq): Promise<LoginResponse> {
		const loginRq = Validation.validate(AuthValidation.LOGIN, request);
		const user: User | null = await prismaClient.user.findUnique({
			where: {
				email: loginRq.email,
			},
		});

		const userPass: string = user?.password ?? "";

		const isPasswordValid = await bcrypt.compare(loginRq.password, userPass);

		if (!user || !isPasswordValid) {
			throw new ResponseError(400, "Wrong email or password");
		}

		return toLoginResponse(user);
	}
}
