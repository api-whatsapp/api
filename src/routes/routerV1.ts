import getVersion from "../controllers/versionController";
import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { AuthController } from "../controllers/authController";

export const publicRouterV1: Router = Router();

publicRouterV1.post("/login", AuthController.login);

publicRouterV1.get("/", authMiddleware, getVersion);

publicRouterV1.all("*", (req: Request, res: Response) => {
	res.status(404).json({
		error: `${req.baseUrl}${req.url} Not Found`,
	});
});