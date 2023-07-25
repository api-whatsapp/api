/* eslint-disable no-console */
import express from "express";

const publicRouter = new express.Router();

publicRouter.get("*", (req, res) => {
  res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});

publicRouter.post("*", (req, res) => {
  res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});

export { publicRouter };
