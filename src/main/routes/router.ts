import getVersion from "../../controllers/versionController";
import { Router, type Request, type Response } from "express";
import { UserController } from "../../controllers/userController";

const publicRouter: Router = Router();

publicRouter.get("/", getVersion);

publicRouter.post("/users", UserController.register);

publicRouter.all("*", (req: Request, res: Response) => {
	res.status(404).json({
		error: `Endpoint ${req.baseUrl}${req.url} Not Found`,
	});
});

export { publicRouter };
