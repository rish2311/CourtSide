import { describe, it, expect, vi, beforeEach } from "vitest";

const mockPost = vi.fn();
const mockGet = vi.fn();
const mockPatch = vi.fn();

vi.mock("../services/api", () => ({
  default: {
    post: mockPost,
    get: mockGet,
    patch: mockPatch,
  },
}));

const {
  loginUser,
  registerUser,
  getCurrentUser,
  updateProfile,
  logoutUser,
} = await import("../services/auth");

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("loginUser", () => {
    it("should call POST /auth/login with payload", async () => {
      mockPost.mockResolvedValue({
        data: {
          success: true,
          data: { user: { id: "1" }, accessToken: "token" },
        },
      });

      const result = await loginUser({
        email: "test@test.com",
        password: "pass",
      });

      expect(mockPost).toHaveBeenCalledWith("/auth/login", {
        email: "test@test.com",
        password: "pass",
      });
      expect(result.success).toBe(true);
      expect(result.data.accessToken).toBe("token");
    });
  });

  describe("registerUser", () => {
    it("should call POST /auth/register with payload", async () => {
      const payload = {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "john@test.com",
        password: "Test@1234",
        confirmPassword: "Test@1234",
      };
      mockPost.mockResolvedValue({
        data: { success: true, data: { user: { id: "1" } } },
      });

      const result = await registerUser(payload);

      expect(mockPost).toHaveBeenCalledWith("/auth/register", payload);
      expect(result.success).toBe(true);
    });
  });

  describe("getCurrentUser", () => {
    it("should call GET /auth/me", async () => {
      mockGet.mockResolvedValue({
        data: { success: true, data: { id: "1", email: "test@test.com" } },
      });

      const result = await getCurrentUser();

      expect(mockGet).toHaveBeenCalledWith("/auth/me");
      expect(result.data.email).toBe("test@test.com");
    });
  });

  describe("updateProfile", () => {
    it("should call PATCH /auth/profile with payload", async () => {
      mockPatch.mockResolvedValue({
        data: { success: true, data: { id: "1", firstName: "Jane" } },
      });

      const result = await updateProfile({ firstName: "Jane" });

      expect(mockPatch).toHaveBeenCalledWith("/auth/profile", {
        firstName: "Jane",
      });
      expect(result.data.firstName).toBe("Jane");
    });
  });

  describe("logoutUser", () => {
    it("should call POST /auth/logout", async () => {
      mockPost.mockResolvedValue({
        data: { success: true, data: null },
      });

      const result = await logoutUser();

      expect(mockPost).toHaveBeenCalledWith("/auth/logout");
      expect(result.success).toBe(true);
    });
  });
});
