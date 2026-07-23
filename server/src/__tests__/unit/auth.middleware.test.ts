import { describe, it, expect, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { authenticate, authorize } from "../../modules/auth/middleware/auth.middleware";
import { generateAccessToken } from "../../utils/jwt";
import { UserRole } from "../../modules/auth/types/user.types";
import { ApiError } from "../../shared/errors";

function mockReq(headers: Record<string, string> = {}): Partial<Request> {
  return {
    headers,
    cookies: {},
  };
}

function mockRes(): Partial<Response> {
  return {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };
}

describe("Auth Middleware", () => {
  describe("authenticate", () => {
    it("should attach user to req when token is valid", () => {
      const token = generateAccessToken({ userId: "123", role: UserRole.PLAYER });
      const req = mockReq({ authorization: `Bearer ${token}` }) as Request;
      const res = mockRes() as Response;
      const next = vi.fn() as NextFunction;

      authenticate(req, res, next);

      expect(next).toHaveBeenCalled();
      expect((req as any).user).toBeDefined();
      expect((req as any).user.userId).toBe("123");
      expect((req as any).user.role).toBe(UserRole.PLAYER);
    });

    it("should throw 401 when no authorization header", () => {
      const req = mockReq({}) as Request;
      const res = mockRes() as Response;
      const next = vi.fn() as NextFunction;

      authenticate(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 401 })
      );
    });

    it("should throw 401 when token is malformed", () => {
      const req = mockReq({ authorization: "Bearer invalid-token" }) as Request;
      const res = mockRes() as Response;
      const next = vi.fn() as NextFunction;

      authenticate(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 401 })
      );
    });
  });

  describe("authorize", () => {
    it("should call next when user has required role", () => {
      const req = { user: { userId: "123", role: UserRole.ADMIN } } as Request;
      const res = mockRes() as Response;
      const next = vi.fn() as NextFunction;

      authorize(UserRole.ADMIN)(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should call next when user has one of the allowed roles", () => {
      const req = { user: { userId: "123", role: UserRole.OWNER } } as Request;
      const res = mockRes() as Response;
      const next = vi.fn() as NextFunction;

      authorize(UserRole.ADMIN, UserRole.OWNER)(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should throw 403 when user does not have required role", () => {
      const req = { user: { userId: "123", role: UserRole.PLAYER } } as Request;
      const res = mockRes() as Response;
      const next = vi.fn() as NextFunction;

      authorize(UserRole.ADMIN)(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 403 })
      );
    });

    it("should throw 401 when user is not authenticated", () => {
      const req = {} as Request;
      const res = mockRes() as Response;
      const next = vi.fn() as NextFunction;

      authorize(UserRole.ADMIN)(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(ApiError));
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: 401 })
      );
    });
  });
});
