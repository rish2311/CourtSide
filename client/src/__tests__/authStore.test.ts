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
      isAuthenticated: false,
      loading: true,
    });
  });

  it("should start with loading=true and no auth", () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(true);
  });

  it("should login and persist token to localStorage", () => {
    useAuthStore.getState().login(mockUser, "test-token");

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe("test-token");
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(localStorage.getItem("token")).toBe("test-token");
  });

  it("should logout and clear localStorage", () => {
    useAuthStore.getState().login(mockUser, "test-token");
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("should update user with setUser", () => {
    useAuthStore.getState().login(mockUser, "test-token");
    useAuthStore.getState().setUser({ ...mockUser, firstName: "Jane" });

    const state = useAuthStore.getState();
    expect(state.user?.firstName).toBe("Jane");
    expect(state.token).toBe("test-token");
  });

  it("should hydrate from localStorage", () => {
    localStorage.setItem("token", "stored-token");

    useAuthStore.getState().hydrate();

    const state = useAuthStore.getState();
    expect(state.token).toBe("stored-token");
    expect(state.loading).toBe(false);
  });

  it("should hydrate with no token when localStorage is empty", () => {
    useAuthStore.getState().hydrate();

    const state = useAuthStore.getState();
    expect(state.token).toBeNull();
    expect(state.loading).toBe(false);
  });
});
