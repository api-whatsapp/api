import { registerUserService } from "../services/userService.js";

const registerUser = async (req, res, next) => {
	try {
		const result = await registerUserService(req.body);

		res.status(201).json({
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export default registerUser;
