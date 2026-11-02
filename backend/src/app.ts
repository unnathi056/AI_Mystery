import cors from "cors";
import express from "express";
import type { CorsOptions } from "cors";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";
import { casesRouter } from "./routes/cases.js";
import { healthRouter } from "./routes/health.js";

export function createApp(frontendUrl = "http://localhost:5173") {
  const app = express();
  const corsOptions: CorsOptions = { origin: frontendUrl };
  app.disable("x-powered-by");
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "32kb" }));
  app.use("/api/cases", casesRouter);
  app.get("/api", (_req, res) => res.json({ name: "AI Mystery Room API", version: "0.1.0" }));
  app.use("/api/health", healthRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
