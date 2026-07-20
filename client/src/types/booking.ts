import type { User } from './user';
import type { Venue } from './venue';

// ─── Booking ──────────────────────────────────────────────────────────────────

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface TimeSlot {
  startTime: string;  // e.g. '10:00'
  endTime: string;    // e.g. '11:00'
}

export interface Booking {
  _id: string;
  venue: Venue | string;   // Populated or just ID depending on the endpoint
  user: User | string;
  date: string;            // ISO date string — e.g. '2024-07-20'
  slots: TimeSlot[];
  totalAmount: number;
  status: BookingStatus;
  paymentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Create Booking Payload ───────────────────────────────────────────────────

export interface CreateBookingPayload {
  venueId: string;
  date: string;
  slots: TimeSlot[];
  notes?: string;
}
