import jwt, { SignOptions } from "jsonwebtoken";
import { ApiError } from "../shared/errors";

// ─── JWT Payload ──────────────────────────────────────────────────────────────
// Step 38.3: Keep the payload minimal — only what's needed for authorization.
// Never include email, phone, avatar, or other PII here.
export interface JwtPayload {
  userId: string;
  role: string;
}

// ─── Environment helpers ──────────────────────────────────────────────────────

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  return secret;
}

function getExpiresIn(): string {
  // Step 38.4: Read expiration from env — never hardcode durations.
  // Default to 15 minutes if not set (a safe, short-lived access token).
  return process.env.JWT_EXPIRES_IN ?? "15m";
}

// ─── generateAccessToken ──────────────────────────────────────────────────────
// Step 38.2: Signs a new JWT for the given user.
// Returns the signed token string — the service is responsible for
// deciding how/where to send it (cookie, response body, etc.).

export function generateAccessToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: getExpiresIn() as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, getSecret(), options);
}

// ─── verifyAccessToken ────────────────────────────────────────────────────────
// Step 38.5: Verifies the token signature and returns the decoded payload.
// Does NOT catch errors — throws JwtExpiredError / JsonWebTokenError.
// The calling middleware is responsible for translating these into HTTP 401s.

export function verifyAccessToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, getSecret());

  // jwt.verify returns string | JwtPayload — narrow to our own shape.
  if (typeof decoded === "string" || !("userId" in decoded)) {
    throw ApiError.unauthorized("Invalid token payload");
  }

  return decoded as JwtPayload;
}
