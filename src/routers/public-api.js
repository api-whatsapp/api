import express from "express";
import registerUser from "../controllers/userController.js";
import getVersion from "../controllers/versionController.js";

const publicRouter = new express.Router();

publicRouter.get("/", getVersion);

publicRouter.post("/users", registerUser);

publicRouter.all("*", function (req, res) {
	res.status(404).json({
		message: "Endpoint Not Found",
	});
});

export { publicRouter };
