import { Router, type Request, type Response } from "express";
import { QRController } from "../../controllers/qrController";
import { authMiddleware } from "../../middleware/authMiddleware";

export const qrRouter: Router = Router();

qrRouter.get("/", authMiddleware, QRController.getQR);
qrRouter.get("/show", authMiddleware, QRController.showQR);

qrRouter.all("*", (req: Request, res: Response) => {
	res.status(404).json({
		error: `${req.baseUrl}${req.url} Not Found`,
	});
});
