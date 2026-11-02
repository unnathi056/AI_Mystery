import { Router } from "express";
import { databaseStatus } from "../config/database.js";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  const database = databaseStatus();
  const healthy = database === "connected";
  res.status(healthy ? 200 : 503).json({
    status: healthy ? "ok" : "unavailable",
    service: "ai-mystery-room-api",
    database,
    timestamp: new Date().toISOString(),
  });
});
