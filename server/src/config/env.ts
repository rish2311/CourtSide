import { config } from "dotenv";

config();

function optional(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

export const env = {
  NODE_ENV: optional("NODE_ENV", "development"),
  PORT: parseInt(optional("PORT", "5000"), 10),
  MONGO_URI: optional("MONGO_URI", ""),
  JWT_SECRET: optional("JWT_SECRET", "fallback-dev-secret"),
  JWT_EXPIRES_IN: optional("JWT_EXPIRES_IN", "15m"),
  CORS_ORIGIN: optional("CORS_ORIGIN", "http://localhost:5173"),
  REDIS_URL: optional("REDIS_URL", ""),
  CLOUDINARY_CLOUD_NAME: optional("CLOUDINARY_CLOUD_NAME", ""),
  CLOUDINARY_API_KEY: optional("CLOUDINARY_API_KEY", ""),
  CLOUDINARY_API_SECRET: optional("CLOUDINARY_API_SECRET", ""),
};
