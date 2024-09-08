import "./process";
import cors from "cors";
import helmet from "helmet";
import express from "express";
// import { fileURLToPath } from "url";
// import path, { dirname } from "path";
import pinoHTTP from "pino-http";
import compression from "compression";
import { logger } from "../config/logger";
import { publicRouterV1, publicRouter } from "../routes";
import { reqInterceptor } from "../middleware/logMiddleware";
import { limiter } from "../middleware/rateLimiterMiddleware";
import { ErrorMiddleware } from "../middleware/errorMiddleware";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(reqInterceptor);
app.use(pinoHTTP({ logger }));
app.use("/v1", publicRouterV1);
app.use("/", publicRouter);
app.use(ErrorMiddleware);
app.disable("x-powered-by");

// app.use(express.static(path.join(__dirname, "../../../public")));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "../../../public/views"));

export { app as web };
