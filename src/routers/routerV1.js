import express from "express";
import getVersion from "../controllers/versionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const publicRouterV1 = new express.Router();

publicRouterV1.get("/v1", authMiddleware, getVersion);

export { publicRouterV1 };
