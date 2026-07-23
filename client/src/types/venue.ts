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

export type VenueStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export interface Venue {
  _id: string;
  id: string;
  name: string;
  description: string;
  owner: string;
  location: VenueLocation;
  images: string[];
  amenities: VenueAmenity[];
  openTime: string;
  closeTime: string;
  status: VenueStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // UI extras (not always from server)
  sport?: string;
  pricePerHour?: number;
  rating?: number;
  totalReviews?: number;
  distance?: number;
  isFullyBooked?: boolean;
  tags?: string[];
  simulatedCoords?: { x: number; y: number };
}

export interface VenueListResult {
  venues: Venue[];
  total: number;
  page: number;
  totalPages: number;
}

export interface VenueFilters {
  city?: string;
  search?: string;
  page?: number;
  limit?: number;
  owner?: string;
  sport?: string;
}

export interface CreateVenuePayload {
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: { lat: number; lng: number };
  };
  amenities?: { name: string; icon?: string }[];
  openTime: string;
  closeTime: string;
}
