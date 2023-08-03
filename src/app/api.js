import express from "express";
import { limiter } from "../middleware/rateLimiter.js";
import { publicRouter } from "../routers/public-api.js";
import { publicRouterV1 } from "../routers/routerV1.js";
import { authenticationCheck } from "../middleware/authenticationCheck.js";

export const api = express();
api.use(authenticationCheck);
api.use(limiter);
api.use(express.json());
api.use(publicRouterV1);
api.use(publicRouter);
