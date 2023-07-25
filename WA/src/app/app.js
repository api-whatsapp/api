import express from "express";
import { publicRouter } from "../routers/api.js";

export const web = express();
web.use(express.json());
web.use(publicRouter);
