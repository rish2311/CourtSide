import api from "./api";
import type {
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  User,
} from "../types/user";
import type { ApiResponse } from "../types/api";

const AUTH_URL = "/auth";

export async function loginUser(
  payload: LoginPayload
): Promise<ApiResponse<{ user: User; accessToken: string }>> {
  const { data } = await api.post(`${AUTH_URL}/login`, payload);
  return data;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<ApiResponse<{ user: User }>> {
  const { data } = await api.post(`${AUTH_URL}/register`, payload);
  return data;
}

export async function getCurrentUser(): Promise<ApiResponse<User>> {
  const { data } = await api.get(`${AUTH_URL}/me`);
  return data;
}

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<ApiResponse<User>> {
  const { data } = await api.patch(`${AUTH_URL}/profile`, payload);
  return data;
}

export async function logoutUser(): Promise<ApiResponse<null>> {
  const { data } = await api.post(`${AUTH_URL}/logout`);
  return data;
}
