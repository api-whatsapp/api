import getVersion from "../controllers/versionController";
import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthController } from "../controllers/authController";
import { DeviceController } from "../controllers/deviceController";

export const publicRouterV1: Router = Router();

publicRouterV1.post("/login", AuthController.login);

publicRouterV1.get("/", authMiddleware, getVersion);

publicRouterV1.post("/devices", authMiddleware, DeviceController.addDevice);
publicRouterV1.get("/devices", authMiddleware, DeviceController.getDeviceList);
publicRouterV1.get(
	"/devices/:deviceId",
	authMiddleware,
	DeviceController.getDeviceData
);

publicRouterV1.all("*", (req: Request, res: Response) => {
	res.status(404).json({
		error: `${req.baseUrl}${req.url} Not Found`,
	});
});
