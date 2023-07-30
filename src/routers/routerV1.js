/* eslint-disable no-console */
import express from "express";
import getQRCode from "../controllers/getQRController.js";
import getVersion from "../controllers/versionController.js";
import sendMessage from "../controllers/messagesController.js";

const publicRouterV1 = new express.Router();

publicRouterV1.get("/v1/api", (req, res) => {
	res.status(200).json({ message: "Hello from public api" });
});

publicRouterV1.get("/v1/qr", getQRCode);

publicRouterV1.post("/v1/messages", sendMessage);

publicRouterV1.get("/v1", getVersion);

publicRouterV1.get("/v1", function (req, res) {
	res.status(404).send("From v1");
});

publicRouterV1.post("/v1", function (req, res) {
	res.status(404).send("From v1");
});

export { publicRouterV1 };
