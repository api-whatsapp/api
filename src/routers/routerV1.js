import express from "express";
import getVersion from "../controllers/versionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const publicRouterV1 = new express.Router();

publicRouterV1.get("/", authMiddleware, getVersion);

publicRouterV1.all("*", function (req, res) {
	res.status(404).json({
		message: "The requested url cannot be found.",
	});
});

export { publicRouterV1 };
