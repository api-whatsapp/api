import { v1 as uuidv1 } from "uuid";
import { prismaClient } from "../app/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../errors/responseErrors.js";
import { registerUserValidation } from "../validation/userValidation.js";

const registerUserService = async (req) => {
	const user = validate(registerUserValidation, req);

	const userExists = await prismaClient.user.count({
		where: {
			email: user.email,
		},
	});

	if (userExists === 1) {
		throw new ResponseError(400, "User already exists");
	}

	const uuid = uuidv1();
	const email = user.email.split("@")[0];
	const token = `${uuid}@-${email}`;

	return await prismaClient.user.create({
		data: {
			email: user.email,
			token: token,
		},
	});
};

export { registerUserService };
