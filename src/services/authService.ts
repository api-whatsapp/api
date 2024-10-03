import bcrypt from "bcrypt";
import { ResponseError } from "../../src/errors/responseErrors";

import { User } from "@prisma/client";

import jwt from "jsonwebtoken";
import Validation from "../validation/validation";
import AuthValidation from "../validation/authValidation";
import {
	LoginResponse,
	LoginRq,
	toJwtPayload,
	toLoginResponse,
} from "../models/authModel";
import { prismaClient } from "../config/database";

export default class AuthService {
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
			throw new ResponseError(400, "Wrong E-mail or password");
		}

		const secret: string = process.env.JWT_SECERET!;
		const exp: number = 86400 * Number(process.env.JWT_EXPIRIED_DAY ?? 1);
		const token = jwt.sign(toJwtPayload(user), secret, { expiresIn: exp });

		return toLoginResponse(user, token);
	}
}
