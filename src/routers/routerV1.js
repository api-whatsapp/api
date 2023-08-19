import express from "express";
import getVersion from "../controllers/versionController.js";

const publicRouterV1 = new express.Router();

publicRouterV1.get("/v1", getVersion);

export { publicRouterV1 };
