export const authenticationCheck = async (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return res.status(401).json({
			message: "Missing API token.",
		});
	} else {
		const bearer = token.split(" ")[1];
		if (!bearer) {
			return res.status(403).json({
				message: "Invalid API token.",
			});
		}
		global.token = token.split(" ")[1];
	}
	next();
};
