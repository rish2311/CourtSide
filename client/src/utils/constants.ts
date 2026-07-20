// ─── API ──────────────────────────────────────────────────────────────────────
export const API_BASE_URL = import.meta.env.VITE_API_URL as string;

// ─── App ──────────────────────────────────────────────────────────────────────
export const APP_NAME = 'CourtSide';
export const APP_TAGLINE = 'Book Your Court, Play Your Game';

// ─── Routes ───────────────────────────────────────────────────────────────────
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  VENUES: '/venues',
  VENUE_DETAIL: (id: string) => `/venues/${id}`,
  BOOKINGS: '/bookings',
  BOOKING_DETAIL: (id: string) => `/bookings/${id}`,
  PROFILE: '/profile',
  ADMIN: '/admin',
} as const;

// ─── Pagination ───────────────────────────────────────────────────────────────
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;

// ─── Sport Types ──────────────────────────────────────────────────────────────
export const SPORT_TYPES = [
  'Cricket',
  'Football',
  'Basketball',
  'Tennis',
  'Badminton',
  'Squash',
  'Volleyball',
  'Pickleball',
] as const;

export type SportType = (typeof SPORT_TYPES)[number];

// ─── Booking Status ───────────────────────────────────────────────────────────
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

// ─── Time Slots ───────────────────────────────────────────────────────────────
export const SLOT_DURATION_MINUTES = 60; // 1 hour slots
