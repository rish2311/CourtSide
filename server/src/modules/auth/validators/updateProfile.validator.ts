import { z } from "zod";

// Only safe, user-editable profile fields.
// email, password, role, isVerified are explicitly excluded.
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
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
