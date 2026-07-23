import mongoose, { Schema } from "mongoose";
import { type Venue, type VenueModel, VenueStatus } from "../types/venue.types";

const venueSchema = new Schema<Venue, VenueModel>(
  {
    owner: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      coordinates: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true },
      },
    },
    images: [{ type: String }],
    amenities: [
      {
        name: { type: String, required: true },
        icon: String,
      },
    ],
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(VenueStatus),
      default: VenueStatus.PENDING,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

venueSchema.index({ "location.coordinates": "2dsphere" });
venueSchema.index({ name: "text", "location.city": "text" });
venueSchema.index({ status: 1, isActive: 1 });

const Venue = mongoose.model<Venue, VenueModel>("Venue", venueSchema);

export default Venue;
