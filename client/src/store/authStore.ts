import { create } from "zustand";
import type { User } from "../types/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  hydrate: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,

  login: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token, isAuthenticated: true, loading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false, loading: false });
  },

  setUser: (user) => set({ user }),

  setLoading: (loading) => set({ loading }),

  hydrate: () => {
    const token = localStorage.getItem("token");
    if (token) {
      set({ token, loading: false });
    } else {
      set({ loading: false });
    }
  },
}));

export default useAuthStore;
