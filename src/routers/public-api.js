import express from "express";
import getQRCode from "../controllers/QRController.js";
import getVersion from "../controllers/versionController.js";
import { addDevice, getDeviceList } from "../controllers/deviceController.js";

const publicRouter = new express.Router();

publicRouter.get("/", getVersion);

publicRouter.get("/qr", getQRCode);

publicRouter.post("/devices", addDevice);
publicRouter.get("/devices", getDeviceList);

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
