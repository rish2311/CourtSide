import type { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { ApiResponse } from "../../../shared/errors";
import { asyncHandler } from "../../../shared/utils";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  new ApiResponse(res).created({ user }, "Registration successful");
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  new ApiResponse(res).success(result, "Login successful");
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  new ApiResponse(res).success(null, "Logged out successfully");
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getCurrentUser(req.user!.userId);
  new ApiResponse(res).success(user, "User fetched successfully");
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.updateProfile(req.user!.userId, req.body);
  new ApiResponse(res).success(user, "Profile updated successfully");
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.refreshAccessToken(req.body.refreshToken);
  new ApiResponse(res).success(result, "Tokens refreshed successfully");
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.forgotPassword(req.body);
  new ApiResponse(res).success(null, "If that email exists, a reset link has been sent");
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.resetPassword(req.body);
  new ApiResponse(res).success(null, "Password reset successful");
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.body);
  new ApiResponse(res).success(null, "Email verified successfully");
});
