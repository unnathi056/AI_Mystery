import type { ErrorRequestHandler, RequestHandler } from "express";

export class AppError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
    this.name = "AppError";
  }
}

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: { code: "NOT_FOUND", message: "Route not found." } });
};

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
  const known = error instanceof AppError;
  const statusCode = known ? error.statusCode : 500;
  const message = known ? error.message : "An unexpected server error occurred.";
  if (!known) console.error("Unhandled request error", error);
  res.status(statusCode).json({
    error: { code: known ? "REQUEST_ERROR" : "INTERNAL_ERROR", message },
  });
};
