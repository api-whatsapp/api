/* eslint-disable no-console */
import express from "express";
import getQRCode from "../controllers/getQRController.js";
import getVersion from "../controllers/versionController.js";
import sendMessage from "../controllers/messagesController.js";

const publicRouterV1 = new express.Router();

publicRouterV1.get("/v1/qr", getQRCode);

publicRouterV1.post("/v1/messages", sendMessage);

publicRouterV1.get("/v1", getVersion);

publicRouterV1.post("/v1", function (req, res) {
	res.status(404).json({
		message: "Not Found",
	});
});

export { publicRouterV1 };
