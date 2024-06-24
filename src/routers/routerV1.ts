import getVersion from "../controllers/versionController";
import { Router, type Request, type Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const publicRouterV1: Router = Router();

publicRouterV1.get("/", authMiddleware, getVersion);

publicRouterV1.all("*", (req: Request, res: Response) => {
	res.status(404).json({
		error: `${req.baseUrl}${req.url} Not Found`,
	});
});

export { publicRouterV1 };
