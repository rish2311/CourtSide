import express, { Express } from "express";
import morgan from "morgan";

import { errorMiddleware } from "./shared/middleware";

// ─── App Setup ────────────────────────────────────────────────────────────────

const app: Express = express();

// ─── Logging (Step 30) ────────────────────────────────────────────────────────
// Morgan logs every HTTP request in development.
// Later: replace with Pino for structured JSON logging in production.
app.use(morgan("dev"));

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ success: true, message: "Courtside Backend Running" });
});

// ─── Routes (add here later) ─────────────────────────────────────────────────
// app.use("/api/v1/auth",   authRoutes);
// app.use("/api/v1/venues", venueRoutes);
// ...

// ─── Global Error Handler (Step 29) ──────────────────────────────────────────
// MUST be the last middleware — catches everything thrown via asyncHandler
app.use(errorMiddleware);

export default app;