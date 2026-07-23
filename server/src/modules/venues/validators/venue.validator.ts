import { z } from "zod";

export const createVenueSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be at most 2000 characters")
    .trim(),
  location: z.object({
    address: z.string().min(1, "Address is required").trim(),
    city: z.string().min(1, "City is required").trim(),
    state: z.string().min(1, "State is required").trim(),
    pincode: z.string().min(1, "Pincode is required").trim(),
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }),
  }),
  amenities: z
    .array(
      z.object({
        name: z.string().min(1).trim(),
        icon: z.string().optional(),
      })
    )
    .optional()
    .default([]),
  openTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Open time must be in HH:mm format"),
  closeTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Close time must be in HH:mm format"),
});

export const updateVenueSchema = createVenueSchema.partial();

export const venueStatusSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "SUSPENDED"]),
});

export type CreateVenueInput = z.infer<typeof createVenueSchema>;
export type UpdateVenueInput = z.infer<typeof updateVenueSchema>;
export type VenueStatusInput = z.infer<typeof venueStatusSchema>;
