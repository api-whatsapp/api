import { ResponseError } from "../errors/responseErrors.js";

export const validate = (schema, req) => {
	const result = schema.validate(req);
	if (result.error) {
		throw new ResponseError(400, result.error.message);
	}
	return result.value;
};
