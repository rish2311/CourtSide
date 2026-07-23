import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./shared/middleware";
import { env } from "./config/env";

// ─── App Setup ────────────────────────────────────────────────────────────────

const app: Express = express();

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// ─── Cookies ──────────────────────────────────────────────────────────────────
app.use(cookieParser());

// ─── Logging ──────────────────────────────────────────────────────────────────
app.use(morgan("dev"));

// ─── Body Parsers ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ success: true, message: "Courtside Backend Running" });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
import authRoutes from "./modules/auth/routes/auth.routes";
import venueRoutes from "./modules/venues/routes/venue.routes";
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/venues", venueRoutes);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorMiddleware);

export default app;