import helmet from "helmet";
import express from "express";
import { publicRouter } from "../routers/router";
import { publicRouterV1 } from "../routers/routerV1";
import { limiter } from "../middleware/rateLimiterMiddleware";
import { ErrorMiddleware } from "../middleware/errorMiddleware";

export const web = express();
web.use(helmet());
web.use(express.json());
web.use(limiter);
web.use("/v1", publicRouterV1);
web.use("/", publicRouter);
web.use(ErrorMiddleware);
web.disable("x-powered-by");
