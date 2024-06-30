import getVersion from "../../controllers/versionController";
import { Router, type Request, type Response } from "express";
import { UserController } from "../../controllers/userController";
import { MessageController } from "../../controllers/messageController";

const publicRouter: Router = Router();

publicRouter.get("/", getVersion);

publicRouter.post("/users", UserController.register);

// Messages
publicRouter.get("/messages", MessageController.sendMessage);
publicRouter.post("/messages", MessageController.sendMessage);
publicRouter.get("/messages/:messageId", MessageController.sendMessage);

publicRouter.all("*", (req: Request, res: Response) => {
	res.status(404).json({
		error: `Endpoint ${req.baseUrl}${req.url} Not Found`,
	});
});

export { publicRouter };
