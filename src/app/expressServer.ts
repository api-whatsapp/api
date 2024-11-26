import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import express, { Application, type Request, type Response } from "express";

export default class ExpressServer {
	private readonly app: Application;

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
		this.app.disable("x-powered-by");
	}

	private setupRoutes() {
		this.app.all("*", (req: Request, res: Response) => {
			res.status(404).json({
				error: `${req.baseUrl}${req.url} Not Found`,
			});
		});
	}

	public getApp(): Application {
		return this.app;
	}
}
