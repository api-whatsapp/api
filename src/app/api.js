import express from "express";
import { publicRouter } from "../routers/router.js";
import { publicRouterV1 } from "../routers/routerV1.js";
import { limiter } from "../middleware/rateLimiterMiddleware.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";

export const app = express();
app.use(express.json());
app.use(limiter);
app.use("/v1", publicRouterV1);
app.use("/", publicRouter);
app.use(errorMiddleware);
