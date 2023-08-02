/* eslint-disable no-console */
import express from "express";
import getQRCode from "../controllers/QRController.js";
import getVersion from "../controllers/versionController.js";
import { addDevice } from "../controllers/deviceController.js";

const publicRouterV1 = new express.Router();

publicRouterV1.get("/v1", getVersion);

publicRouterV1.get("/v1/qr", getQRCode);

publicRouterV1.post("/v1/devices", addDevice);

export { publicRouterV1 };
