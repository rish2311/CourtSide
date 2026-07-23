import { Document, Model } from "mongoose";

export enum VenueStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SUSPENDED = "SUSPENDED",
}

export interface Venue extends Document {
  owner: string;
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  images: string[];
  amenities: { name: string; icon?: string }[];
  openTime: string;
  closeTime: string;
  status: VenueStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VenueModel extends Model<Venue> {}

export interface VenueDTO {
  id: string;
  owner: string;
  name: string;
  description: string;
  location: Venue["location"];
  images: string[];
  amenities: Venue["amenities"];
  openTime: string;
  closeTime: string;
  status: VenueStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
