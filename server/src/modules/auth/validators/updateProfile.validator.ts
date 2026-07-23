import { z } from "zod";
import { SkillLevel } from "../types/user.types";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .trim()
    .regex(/^[a-zA-Z]+$/, "First name must contain letters only")
    .optional(),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .trim()
    .regex(/^[a-zA-Z]+$/, "Last name must contain letters only")
    .optional(),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Please provide a valid phone number")
    .optional(),

  avatar: z.string().url("Avatar must be a valid URL").optional(),

  sportsInterests: z.array(z.string()).optional(),

  skillLevel: z.nativeEnum(SkillLevel).optional(),

  preferredLocation: z.string().trim().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please provide a valid email").trim().toLowerCase(),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
