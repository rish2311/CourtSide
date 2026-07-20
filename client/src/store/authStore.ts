import { create } from 'zustand';

// ─── Types ───────────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'venue_owner' | 'admin';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

const useAuthStore = create<AuthState>((set) => ({
  // Initial state
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,

  // Actions
  login: (user, token) =>
    set({ user, token, isAuthenticated: true, loading: false }),

  logout: () =>
    set({ user: null, token: null, isAuthenticated: false, loading: false }),

  setUser: (user) => set({ user }),

  setLoading: (loading) => set({ loading }),
}));

export default useAuthStore;