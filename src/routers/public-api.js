import express from "express";
import getVersion from "../controllers/versionController.js";
import {
	addDevice,
	deleteDevice,
	getDeviceList,
	getDeviceStatus,
} from "../controllers/deviceController.js";

const publicRouter = new express.Router();

publicRouter.get("/", getVersion);

publicRouter.post("/devices", addDevice);
publicRouter.get("/devices", getDeviceList);
publicRouter.get("/devices/:device_id", getDeviceStatus);
publicRouter.delete("/devices/:device_id", deleteDevice);


publicRouter.all("*", function (req, res) {
	res.status(404).json({
		message: "Endpoint Not Found",
	});
});

export { publicRouter };
