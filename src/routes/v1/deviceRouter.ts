import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../../middleware/authMiddleware";
import { DeviceController } from "../../controllers/deviceController";

export const deviceRouter: Router = Router();

deviceRouter.post("/", authMiddleware, DeviceController.addDevice);
deviceRouter.get("/", authMiddleware, DeviceController.getDeviceList);
deviceRouter.delete("/:deviceId", authMiddleware, DeviceController.remove);
deviceRouter.get("/:deviceId", authMiddleware, DeviceController.getDeviceData);

deviceRouter.all("*", (req: Request, res: Response) => {
	res.status(404).json({
		error: `${req.baseUrl}${req.url} Not Found`,
	});
});
