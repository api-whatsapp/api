import express from "express";
import getQRCode from "../controllers/QRController.js";
import getVersion from "../controllers/versionController.js";
import {
	addDevice,
	deleteDevice,
	getDeviceList,
	getDeviceStatus,
} from "../controllers/deviceController.js";

const publicRouterV1 = new express.Router();

publicRouterV1.get("/v1", getVersion);

publicRouterV1.get("/v1/qr", getQRCode);

publicRouterV1.post("/v1/devices", addDevice);
publicRouterV1.get("/v1/devices", getDeviceList);
publicRouterV1.get("/v1/devices/:device_id", getDeviceStatus);
publicRouterV1.delete("/v1/devices/:device_id", deleteDevice);

export { publicRouterV1 };
