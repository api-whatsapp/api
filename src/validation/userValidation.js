import Joi from "joi";

const registerUserValidation = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"string.base": "email should be a type of string",
			"string.empty": "email must contain value",
			"string.email": "email must be a valid email",
			"any.required": "email is a required",
		}),
});

export { registerUserValidation };
