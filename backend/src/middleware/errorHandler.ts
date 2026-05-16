import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

interface ApiError extends Error {
  statusCode?: number;
}

export const errorHandler: ErrorRequestHandler = (error: ApiError, _req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      details: error.issues.map((issue) => ({ path: issue.path, message: issue.message }))
    });
  }

  const statusCode = error.statusCode ?? 500;
  const message = error.message || "Something went wrong";

  res.status(statusCode).json({ message });
};
