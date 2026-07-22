import type { SportType } from '@/utils/constants';

// ─── Venue ────────────────────────────────────────────────────────────────────

export interface VenueLocation {
  address: string;
  city: string;
  state: string;
  pincode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface VenueAmenity {
  name: string;
  icon?: string;
}

export interface Venue {
  _id: string;
  name: string;
  description: string;
  sport: SportType;
  owner: string;             // User._id
  location: VenueLocation;
  images: string[];
  pricePerHour: number;
  amenities: VenueAmenity[];
  openTime: string;          // e.g. '06:00'
  closeTime: string;         // e.g. '22:00'
  rating: number;
  totalReviews: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Design System Extensions
  distance?: number;          // in miles
  isFullyBooked?: boolean;
  tags?: string[];            // e.g., ['Fast-Track', 'Premium']
  simulatedCoords?: { x: number; y: number }; // Normalized 0-100 for prototype map
}

// ─── Venue Filters ────────────────────────────────────────────────────────────

export interface VenueFilters {
  sport?: SportType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  date?: string;
}
