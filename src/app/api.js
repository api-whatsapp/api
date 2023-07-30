import express from "express";
import { publicRouter } from "../routers/public-api.js";
import { publicRouterV1 } from "../routers/routerV1.js";

export const api = express();
api.use(express.json());
api.use(publicRouterV1);
api.use(publicRouter);
