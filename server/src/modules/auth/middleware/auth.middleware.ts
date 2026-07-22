import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, type JwtPayload } from "../../../utils/jwt";
import { ApiError } from "../../../shared/errors";
import { UserRole } from "../types/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(ApiError.unauthorized("No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch {
    next(ApiError.unauthorized("Invalid or expired token"));
  }
}

export function authorize(...allowedRoles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized("Not authenticated"));
    }

    if (!allowedRoles.includes(req.user.role as UserRole)) {
      return next(ApiError.forbidden("Insufficient permissions"));
    }

    next();
  };
}
