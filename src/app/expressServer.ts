import "./process";
import cors from "cors";
import helmet from "helmet";
import pinoHTTP from "pino-http";
import compression from "compression";
import { logger } from "../config/logger";
// import { publicRouterV1, publicRouter } from "../routes";
// import { reqInterceptor } from "../middleware/logMiddleware";
// import { limiter } from "../middleware/rateLimiterMiddleware";
// import { ErrorMiddleware } from "../middleware/errorMiddleware";
import express, { Application, type Request, type Response } from "express";

export class ExpressServer {
	private app: Application;

	constructor() {
		this.app = express();
		this.setupMiddleware();
		this.setupRoutes();
	}

	private setupMiddleware() {
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		// this.app.use(limiter);
		// this.app.use(reqInterceptor);
		this.app.use(pinoHTTP({ logger }));
		// this.app.use(ErrorMiddleware);
		this.app.disable("x-powered-by");
	}

	private setupRoutes() {
		// this.app.use("/v1", publicRouterV1);
		// this.app.use("/", publicRouter);
		this.app.all("*", (req: Request, res: Response) => {
			res.status(404).json({
				error: `Endpoint ${req.baseUrl}${req.url} Not Found`,
			});
		});
		this.app.all("*", (_: Request, res: Response) =>
			res.status(404).json({ error: "URL not found" })
		);
	}

	public getApp(): Application {
		return this.app;
	}
}
