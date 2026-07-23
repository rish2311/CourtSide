import type { Request, Response, NextFunction } from "express";
import * as venueService from "../services/venue.service";
import { ApiResponse } from "../../../shared/errors";
import { uploadToCloudinary } from "../middleware/upload";

export const create = async (req: Request, res: Response, _next: NextFunction) => {
  const venue = await venueService.create(req.user!.userId, req.body);
  new ApiResponse(res).created(venue, "Venue created");
};

export const getById = async (req: Request, res: Response, _next: NextFunction) => {
  const venue = await venueService.getById(req.params.id);
  new ApiResponse(res).success(venue);
};

export const list = async (req: Request, res: Response, _next: NextFunction) => {
  const result = await venueService.list({
    city: req.query.city as string,
    sport: req.query.sport as string,
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    lat: req.query.lat ? Number(req.query.lat) : undefined,
    lng: req.query.lng ? Number(req.query.lng) : undefined,
    radius: req.query.radius ? Number(req.query.radius) : undefined,
    search: req.query.search as string,
    status: req.query.status as string,
    owner: req.query.owner as string,
    page: req.query.page ? Number(req.query.page) : undefined,
    limit: req.query.limit ? Number(req.query.limit) : undefined,
  });
  new ApiResponse(res).success(result);
};

export const update = async (req: Request, res: Response, _next: NextFunction) => {
  const venue = await venueService.update(req.params.id, req.user!.userId, req.body);
  new ApiResponse(res).success(venue, "Venue updated");
};

export const remove = async (req: Request, res: Response, _next: NextFunction) => {
  await venueService.remove(req.params.id, req.user!.userId);
  new ApiResponse(res).noContent();
};

export const updateStatus = async (req: Request, res: Response, _next: NextFunction) => {
  const venue = await venueService.updateStatus(req.params.id, req.body);
  new ApiResponse(res).success(venue, "Venue status updated");
};

export const addImages = async (req: Request, res: Response, _next: NextFunction) => {
  let urls: string[];

  if (req.file) {
    const url = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
    urls = [url];
  } else if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    urls = await Promise.all(
      req.files.map((f) => uploadToCloudinary(f.buffer, f.mimetype))
    );
  } else {
    urls = req.body.urls as string[];
  }

  const venue = await venueService.addImages(req.params.id, req.user!.userId, urls);
  new ApiResponse(res).success(venue, "Images added");
};

export const removeImage = async (req: Request, res: Response, _next: NextFunction) => {
  const venue = await venueService.removeImage(req.params.id, req.user!.userId, req.body.imageUrl);
  new ApiResponse(res).success(venue, "Image removed");
};
