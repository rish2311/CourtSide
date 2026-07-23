import VenueModel from "../model/venue.model";
import { ApiError } from "../../../shared/errors";
import type { Venue, VenueDTO } from "../types/venue.types";
import { VenueStatus } from "../types/venue.types";
import type { CreateVenueInput, UpdateVenueInput, VenueStatusInput } from "../validators/venue.validator";

function toDTO(venue: Venue): VenueDTO {
  return {
    id: (venue._id as unknown as string).toString(),
    owner: venue.owner,
    name: venue.name,
    description: venue.description,
    location: venue.location,
    images: venue.images,
    amenities: venue.amenities,
    openTime: venue.openTime,
    closeTime: venue.closeTime,
    status: venue.status,
    isActive: venue.isActive,
    createdAt: venue.createdAt,
    updatedAt: venue.updatedAt,
  };
}

export async function create(
  ownerId: string,
  dto: CreateVenueInput
): Promise<VenueDTO> {
  const venue = await VenueModel.create({
    owner: ownerId,
    name: dto.name,
    description: dto.description,
    location: {
      address: dto.location.address,
      city: dto.location.city,
      state: dto.location.state,
      pincode: dto.location.pincode,
      coordinates: {
        type: "Point",
        coordinates: [dto.location.coordinates.lng, dto.location.coordinates.lat],
      },
    },
    amenities: dto.amenities,
    openTime: dto.openTime,
    closeTime: dto.closeTime,
  });

  return toDTO(venue);
}

export async function getById(venueId: string): Promise<VenueDTO> {
  const venue = await VenueModel.findById(venueId);
  if (!venue) throw ApiError.notFound("Venue not found");
  return toDTO(venue);
}

export async function list(query: {
  city?: string;
  sport?: string;
  minPrice?: number;
  maxPrice?: number;
  lat?: number;
  lng?: number;
  radius?: number;
  search?: string;
  status?: string;
  owner?: string;
  page?: number;
  limit?: number;
}): Promise<{ venues: VenueDTO[]; total: number; page: number; totalPages: number }> {
  const filter: Record<string, unknown> = {};

  if (query.status) filter.status = query.status;
  else filter.status = VenueStatus.APPROVED;

  if (query.isActive !== undefined) filter.isActive = query.isActive;
  else filter.isActive = true;

  if (query.owner) filter.owner = query.owner;

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { "location.city": { $regex: query.search, $options: "i" } },
    ];
  } else {
    if (query.city) {
      filter["location.city"] = { $regex: query.city, $options: "i" };
    }
  }

  const page = Math.max(1, query.page || 1);
  const limit = Math.min(50, Math.max(1, query.limit || 10));
  const skip = (page - 1) * limit;

  let geoPipeline: Record<string, unknown>[] = [];

  if (query.lat !== undefined && query.lng !== undefined) {
    const radius = (query.radius || 10) * 1000;
    geoPipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [query.lng, query.lat],
          },
          distanceField: "distance",
          maxDistance: radius,
          spherical: true,
          query: filter,
        },
      },
    ];
  }

  let venues: Venue[];
  let total: number;

  if (geoPipeline.length > 0) {
    const results = await VenueModel.aggregate([
      ...geoPipeline,
      { $skip: skip },
      { $limit: limit },
    ]);
    venues = results;

    const countResult = await VenueModel.aggregate([
      ...geoPipeline.slice(0, 1),
      { $count: "total" },
    ]);
    total = countResult[0]?.total || 0;
  } else {
    venues = await VenueModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
    total = await VenueModel.countDocuments(filter);
  }

  return {
    venues: venues.map(toDTO),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function update(
  venueId: string,
  ownerId: string,
  dto: UpdateVenueInput
): Promise<VenueDTO> {
  const venue = await VenueModel.findById(venueId);
  if (!venue) throw ApiError.notFound("Venue not found");
  if (venue.owner !== ownerId) throw ApiError.forbidden("You can only edit your own venues");

  const update: Record<string, unknown> = {};
  if (dto.name !== undefined) update.name = dto.name;
  if (dto.description !== undefined) update.description = dto.description;
  if (dto.openTime !== undefined) update.openTime = dto.openTime;
  if (dto.closeTime !== undefined) update.closeTime = dto.closeTime;
  if (dto.amenities !== undefined) update.amenities = dto.amenities;

  if (dto.location !== undefined) {
    update["location.address"] = dto.location.address;
    update["location.city"] = dto.location.city;
    update["location.state"] = dto.location.state;
    update["location.pincode"] = dto.location.pincode;
    if (dto.location.coordinates) {
      update["location.coordinates"] = {
        type: "Point",
        coordinates: [dto.location.coordinates.lng, dto.location.coordinates.lat],
      };
    }
  }

  const updated = await VenueModel.findByIdAndUpdate(
    venueId,
    { $set: update },
    { returnDocument: "after", runValidators: true }
  );

  if (!updated) throw ApiError.notFound("Venue not found");
  return toDTO(updated);
}

export async function remove(venueId: string, ownerId: string): Promise<void> {
  const venue = await VenueModel.findById(venueId);
  if (!venue) throw ApiError.notFound("Venue not found");
  if (venue.owner !== ownerId) throw ApiError.forbidden("You can only delete your own venues");

  await VenueModel.findByIdAndDelete(venueId);
}

export async function updateStatus(
  venueId: string,
  dto: VenueStatusInput
): Promise<VenueDTO> {
  const venue = await VenueModel.findByIdAndUpdate(
    venueId,
    { $set: { status: dto.status } },
    { returnDocument: "after", runValidators: true }
  );

  if (!venue) throw ApiError.notFound("Venue not found");
  return toDTO(venue);
}

export async function addImages(
  venueId: string,
  ownerId: string,
  urls: string[]
): Promise<VenueDTO> {
  const venue = await VenueModel.findById(venueId);
  if (!venue) throw ApiError.notFound("Venue not found");
  if (venue.owner !== ownerId) throw ApiError.forbidden("You can only modify your own venues");

  venue.images.push(...urls);
  await venue.save();
  return toDTO(venue);
}

export async function removeImage(
  venueId: string,
  ownerId: string,
  imageUrl: string
): Promise<VenueDTO> {
  const venue = await VenueModel.findById(venueId);
  if (!venue) throw ApiError.notFound("Venue not found");
  if (venue.owner !== ownerId) throw ApiError.forbidden("You can only modify your own venues");

  venue.images = venue.images.filter((img) => img !== imageUrl);
  await venue.save();
  return toDTO(venue);
}
