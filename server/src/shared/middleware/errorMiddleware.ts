import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/ApiError";

// ─── errorMiddleware ──────────────────────────────────────────────────────────
// Global Express error handler. Must be registered LAST in app.ts
// (after all routes) and must have exactly 4 parameters.
//
// Handles:
//   - ApiError instances   → structured JSON response with correct status
//   - Mongoose CastError   → 400 Bad Request (invalid ObjectId, etc.)
//   - JWT errors           → 401 Unauthorized
//   - Unknown errors       → 500 Internal Server Error

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  // ── Known, operational ApiError ─────────────────────────────────────────────
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: Object.keys(err.errors).length ? err.errors : undefined,
    });
    return;
  }

  // ── Mongoose invalid ObjectId ────────────────────────────────────────────────
  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "Invalid resource ID format",
    });
    return;
  }

  // ── Mongoose duplicate key ───────────────────────────────────────────────────
  if (err.name === "MongoServerError" && (err as any).code === 11000) {
    const field = Object.keys((err as any).keyValue || {})[0] ?? "field";
    res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
    return;
  }

  // ── JWT errors ───────────────────────────────────────────────────────────────
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    res.status(401).json({
      success: false,
      message: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
    return;
  }

  // ── Unhandled / programmer errors ────────────────────────────────────────────
  console.error("❌ Unhandled error:", err);

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
};
