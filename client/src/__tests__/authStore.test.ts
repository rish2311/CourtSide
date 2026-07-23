import { describe, it, expect, beforeEach } from "vitest";
import useAuthStore from "../store/authStore";
import type { User } from "../types/user";
import { UserRole } from "../types/user";

const mockUser: User = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  email: "john@example.com",
  role: UserRole.PLAYER,
  isVerified: false,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("AuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      loading: true,
    });
  });

  it("should start with loading=true and no auth", () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(true);
  });

  it("should login and persist tokens to localStorage", () => {
    useAuthStore.getState().login(mockUser, "test-token", "test-refresh");

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe("test-token");
    expect(state.refreshToken).toBe("test-refresh");
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(localStorage.getItem("token")).toBe("test-token");
    expect(localStorage.getItem("refreshToken")).toBe("test-refresh");
  });

  it("should logout and clear localStorage", () => {
    useAuthStore.getState().login(mockUser, "test-token", "test-refresh");
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
  });

  it("should update user with setUser", () => {
    useAuthStore.getState().login(mockUser, "test-token", "test-refresh");
    useAuthStore.getState().setUser({ ...mockUser, firstName: "Jane" });

    const state = useAuthStore.getState();
    expect(state.user?.firstName).toBe("Jane");
  });

  it("should setTokens without affecting user", () => {
    useAuthStore.getState().login(mockUser, "old-token", "old-refresh");
    useAuthStore.getState().setTokens("new-token", "new-refresh");

    const state = useAuthStore.getState();
    expect(state.token).toBe("new-token");
    expect(state.refreshToken).toBe("new-refresh");
    expect(state.user?.firstName).toBe("John");
  });

  it("should hydrate from localStorage", () => {
    localStorage.setItem("token", "stored-token");
    localStorage.setItem("refreshToken", "stored-refresh");

    useAuthStore.getState().hydrate();

    const state = useAuthStore.getState();
    expect(state.token).toBe("stored-token");
    expect(state.refreshToken).toBe("stored-refresh");
    expect(state.loading).toBe(false);
  });
});
