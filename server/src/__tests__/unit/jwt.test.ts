import { describe, it, expect } from "vitest";
import { generateAccessToken, verifyAccessToken, JwtPayload } from "../../utils/jwt";

const mockPayload: JwtPayload = { userId: "123", role: "PLAYER" };

describe("JWT Utilities", () => {
  describe("generateAccessToken", () => {
    it("should generate a valid JWT string", () => {
      const token = generateAccessToken(mockPayload);
      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".")).toHaveLength(3);
    });
  });

  describe("verifyAccessToken", () => {
    it("should verify and decode a valid token", () => {
      const token = generateAccessToken(mockPayload);
      const decoded = verifyAccessToken(token);
      expect(decoded.userId).toBe("123");
      expect(decoded.role).toBe("PLAYER");
    });

    it("should throw on an expired token", () => {
      const expiredToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiUExBWUVSIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.5x5PmJ6m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7m7";
      expect(() => verifyAccessToken(expiredToken)).toThrow();
    });

    it("should throw on a malformed token", () => {
      expect(() => verifyAccessToken("not-a-token")).toThrow();
    });

    it("should throw on a token signed with a different secret", () => {
      const token = generateAccessToken(mockPayload);
      process.env.JWT_SECRET = "different-secret";
      expect(() => verifyAccessToken(token)).toThrow();
      process.env.JWT_SECRET = "test-secret";
    });
  });
});
