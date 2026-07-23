import jwt, { SignOptions } from "jsonwebtoken";
import { ApiError } from "../shared/errors";

export interface JwtPayload {
  userId: string;
  role: string;
}

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is not defined");
  return secret;
}

function getRefreshSecret(): string {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) throw new Error("JWT_REFRESH_SECRET environment variable is not defined");
  return secret;
}

function getExpiresIn(): string {
  return process.env.JWT_EXPIRES_IN ?? "15m";
}

function getRefreshExpiresIn(): string {
  return process.env.JWT_REFRESH_EXPIRES_IN ?? "7d";
}

export function generateAccessToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: getExpiresIn() as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, getSecret(), options);
}

export function generateRefreshToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: getRefreshExpiresIn() as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, getRefreshSecret(), options);
}

export function verifyAccessToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, getSecret());
  if (typeof decoded === "string" || !("userId" in decoded)) {
    throw ApiError.unauthorized("Invalid token payload");
  }
  return decoded as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, getRefreshSecret());
  if (typeof decoded === "string" || !("userId" in decoded)) {
    throw ApiError.unauthorized("Invalid refresh token payload");
  }
  return decoded as JwtPayload;
}
