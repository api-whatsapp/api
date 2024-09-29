import { deviceRouter } from "./v1/device";
// import getVersion from "../controllers/versionController";
import { Router, type Request, type Response } from "express";
// import { authMiddleware } from "../middleware/authMiddleware";
import { AuthController } from "../controllers/authController";
import { qrRouter } from "./v1/qrRouter";

export const publicRouterV1: Router = Router();

publicRouterV1.post("/login", AuthController.login);

publicRouterV1.use("/qr", qrRouter);
publicRouterV1.use("/devices", deviceRouter);

publicRouterV1.all("*", (req: Request, res: Response) => {
	res.status(404).json({
		error: `${req.baseUrl}${req.url} Not Found`,
	});
});
