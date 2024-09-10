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

import jwt from "jsonwebtoken";

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

		const secret: string = process.env.JWT_SECERET!;
		const exp: number = 86400 * Number(process.env.JWT_EXPIRIED_DAY ?? 1);
		const token = jwt.sign(user, secret, { expiresIn: exp });

		return toLoginResponse(user, token);
	}
}
