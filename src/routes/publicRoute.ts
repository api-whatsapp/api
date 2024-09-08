import getVersion from "../controllers/versionController";
import { QRController } from "../controllers/qrController";
import { Router, type Request, type Response } from "express";
import { UserController } from "../controllers/userController";
import { MessageController } from "../controllers/messageController";

export const publicRouter: Router = Router();

publicRouter.get("/", getVersion);

publicRouter.post("/users", UserController.register);

publicRouter.get("/qr", QRController.getQR);
publicRouter.get("/qr/show", QRController.showQR);

// Messages
publicRouter.post("/messages", MessageController.sendMessage);
publicRouter.get("/messages", MessageController.getAllMessages);
publicRouter.get("/messages/:messageId", MessageController.getMessageInfo);

publicRouter.all("*", (req: Request, res: Response) => {
	res.status(404).json({
		error: `Endpoint ${req.baseUrl}${req.url} Not Found`,
	});
});
