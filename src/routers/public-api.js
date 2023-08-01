/* eslint-disable no-console */
import express from "express";
import getQRCode from "../controllers/getQRController.js";
import getVersion from "../controllers/versionController.js";

const publicRouter = new express.Router();

publicRouter.get("/", getVersion);

publicRouter.get("/qr", getQRCode);

publicRouter.get("*", function (req, res) {
	res.status(404).json({
		message: "Not Found",
	});
});

publicRouter.post("*", function (req, res) {
	res.status(404).json({
		message: "Not Found",
	});
});

export { publicRouter };
