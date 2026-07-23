import { create } from "zustand";
import type { User } from "../types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setTokens: (token: string, refreshToken: string) => void;
  setLoading: (loading: boolean) => void;
  hydrate: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: true,

  login: (user, token, refreshToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    set({ user, token, refreshToken, isAuthenticated: true, loading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    set({ user: null, token: null, refreshToken: null, isAuthenticated: false, loading: false });
  },

  setUser: (user) => set({ user }),

  setTokens: (token, refreshToken) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    set({ token, refreshToken });
  },

  setLoading: (loading) => set({ loading }),

  hydrate: () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    if (token) {
      set({ token, refreshToken, loading: false });
    } else {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
