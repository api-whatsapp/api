import express from "express";
import { publicRouter } from "../routers/public-api.js";
import { publicRouterV1 } from "../routers/routerV1.js";
import { limiter } from "../middleware/rateLimiterMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";

export const api = express();
api.use(express.json());
api.use(authMiddleware);
api.use(limiter);
api.use(publicRouterV1);
api.use(publicRouter);
api.use(errorMiddleware);
