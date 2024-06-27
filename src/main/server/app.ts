import cors from "cors";
import path from "path";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import { publicRouter } from "../routes/router";
import { publicRouterV1 } from "../routes/routerV1";
import { limiter } from "../middleware/rateLimiterMiddleware";
import { ErrorMiddleware } from "../middleware/errorMiddleware";
import { reqInterceptor } from "../middleware/logMiddleware";

export const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(reqInterceptor);
app.use("/v1", publicRouterV1);
app.use("/", publicRouter);
app.use(ErrorMiddleware);
app.disable("x-powered-by");

app.use(express.static(path.join(__dirname, "..", "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "..", "public"));

export { app as web };
