import { describe, it, expect, beforeEach } from "vitest";
import User from "../../modules/auth/model/user.model";
import * as authService from "../../modules/auth/services/auth.service";
import { ApiError } from "../../shared/errors";

const validRegisterInput = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  email: "john@example.com",
  password: "Test@1234",
  confirmPassword: "Test@1234",
};

describe("AuthService", () => {
  describe("register", () => {
    it("should register a new user and return a DTO", async () => {
      const result = await authService.register(validRegisterInput);

      expect(result).toBeDefined();
      expect(result.email).toBe("john@example.com");
      expect(result.firstName).toBe("John");
      expect(result.lastName).toBe("Doe");
      expect(result.username).toBe("johndoe");
      expect(result.role).toBe("PLAYER");
      expect(result.isVerified).toBe(false);
      expect(result.isActive).toBe(true);
      expect(result.id).toBeDefined();
      expect(result).not.toHaveProperty("password");
    });

    it("should throw conflict when email already exists", async () => {
      await authService.register(validRegisterInput);

      await expect(
        authService.register(validRegisterInput)
      ).rejects.toThrow(ApiError);

      await expect(
        authService.register(validRegisterInput)
      ).rejects.toThrow("An account with this email already exists");
    });

    it("should throw conflict when username already exists", async () => {
      await authService.register(validRegisterInput);

      await expect(
        authService.register({
          ...validRegisterInput,
          email: "other@example.com",
        })
      ).rejects.toThrow("This username is already taken");
    });

    it("should hash the password before storing", async () => {
      await authService.register(validRegisterInput);

      const user = await User.findOne({ email: "john@example.com" }).select(
        "+password"
      );
      expect(user).toBeDefined();
      expect(user!.password).not.toBe("Test@1234");
      expect(user!.password).toMatch(/^\$2[aby]\$\d+\$/);
    });
  });

  describe("login", () => {
    beforeEach(async () => {
      await authService.register(validRegisterInput);
    });

    it("should login with correct credentials and return user + token", async () => {
      const result = await authService.login({
        email: "john@example.com",
        password: "Test@1234",
      });

      expect(result.user).toBeDefined();
      expect(result.user.email).toBe("john@example.com");
      expect(result.accessToken).toBeDefined();
      expect(typeof result.accessToken).toBe("string");
    });

    it("should throw unauthorized for wrong password", async () => {
      await expect(
        authService.login({
          email: "john@example.com",
          password: "WrongPass@1",
        })
      ).rejects.toThrow(ApiError);
    });

    it("should throw unauthorized for non-existent email", async () => {
      await expect(
        authService.login({
          email: "nonexistent@example.com",
          password: "Test@1234",
        })
      ).rejects.toThrow("Invalid email or password");
    });

    it("should return the same error for wrong password and non-existent user (no email enumeration)", async () => {
      const wrongPassword = authService.login({
        email: "john@example.com",
        password: "WrongPass@1",
      });
      const nonExistent = authService.login({
        email: "noone@example.com",
        password: "Test@1234",
      });

      const [wpErr, neErr] = await Promise.all([
        wrongPassword.catch((e) => e.message),
        nonExistent.catch((e) => e.message),
      ]);

      expect(wpErr).toBe("Invalid email or password");
      expect(neErr).toBe("Invalid email or password");
    });
  });

  describe("getCurrentUser", () => {
    it("should return the user DTO for a valid userId", async () => {
      const { id } = await authService.register(validRegisterInput);

      const result = await authService.getCurrentUser(id);
      expect(result).toBeDefined();
      expect(result.email).toBe("john@example.com");
    });

    it("should throw not found for invalid userId", async () => {
      await expect(
        authService.getCurrentUser("000000000000000000000000")
      ).rejects.toThrow("User account not found");
    });
  });

  describe("updateProfile", () => {
    it("should update allowed fields", async () => {
      const { id } = await authService.register(validRegisterInput);

      const updated = await authService.updateProfile(id, {
        firstName: "Jane",
        phone: "+1234567890",
      });

      expect(updated.firstName).toBe("Jane");
      expect(updated.phone).toBe("+1234567890");
      expect(updated.lastName).toBe("Doe");
    });

    it("should throw not found for non-existent user", async () => {
      await expect(
        authService.updateProfile("000000000000000000000000", {
          firstName: "Jane",
        })
      ).rejects.toThrow("User account not found");
    });
  });
});
