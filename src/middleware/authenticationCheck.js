export const authenticationCheck = async (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({
			message: "Missing API token.",
		});
	}
	next();
};
