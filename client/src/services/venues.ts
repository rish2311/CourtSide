import api from "./api";
import type {
  Venue,
  VenueListResult,
  CreateVenuePayload,
} from "../types/venue";
import type { ApiResponse } from "../types/api";

const VENUES_URL = "/venues";

export async function listVenues(
  params?: Record<string, string | number | undefined>
): Promise<ApiResponse<VenueListResult>> {
  const { data } = await api.get(VENUES_URL, { params });
  return data;
}

export async function getVenue(id: string): Promise<ApiResponse<Venue>> {
  const { data } = await api.get(`${VENUES_URL}/${id}`);
  return data;
}

export async function createVenue(
  payload: CreateVenuePayload
): Promise<ApiResponse<Venue>> {
  const { data } = await api.post(VENUES_URL, payload);
  return data;
}

export async function updateVenue(
  id: string,
  payload: Partial<CreateVenuePayload>
): Promise<ApiResponse<Venue>> {
  const { data } = await api.patch(`${VENUES_URL}/${id}`, payload);
  return data;
}

export async function deleteVenue(id: string): Promise<void> {
  await api.delete(`${VENUES_URL}/${id}`);
}

export async function updateVenueStatus(
  id: string,
  status: string
): Promise<ApiResponse<Venue>> {
  const { data } = await api.patch(`${VENUES_URL}/${id}/status`, { status });
  return data;
}

export async function addVenueImages(
  id: string,
  urls: string[]
): Promise<ApiResponse<Venue>> {
  const { data } = await api.post(`${VENUES_URL}/${id}/images`, { urls });
  return data;
}

export async function removeVenueImage(
  id: string,
  imageUrl: string
): Promise<ApiResponse<Venue>> {
  const { data } = await api.delete(`${VENUES_URL}/${id}/images`, {
    data: { imageUrl },
  });
  return data;
}
