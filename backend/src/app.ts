import cors from "cors";
import express from "express";
import type { CorsOptions } from "cors";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";
import { casesRouter } from "./routes/cases.js";
import { healthRouter } from "./routes/health.js";

export function createApp(frontendUrl = "http://localhost:5173", serveFrontend = false) {
  const app = express();
  const corsOptions: CorsOptions = { origin: frontendUrl };
  app.disable("x-powered-by");
  app.use(cors(corsOptions));
  app.use(express.json({ limit: "32kb" }));
  app.use("/api/cases", casesRouter);
  app.get("/api", (_req, res) => res.json({ name: "AI Mystery Room API", version: "0.1.0" }));
  app.use("/api/health", healthRouter);
  if (serveFrontend) {
    const frontendDist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../frontend/dist");
    app.use(express.static(frontendDist));
    app.get("*", (_req, res, next) => {
      res.sendFile(path.join(frontendDist, "index.html"), (error) => {
        if (error) next(error);
      });
    });
  }
  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
