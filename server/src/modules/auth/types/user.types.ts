import { Document, Model } from "mongoose";

export enum UserRole {
  PLAYER = "PLAYER",
  OWNER = "OWNER",
  ADMIN = "ADMIN",
}

// ─── Mongoose Document Shape ──────────────────────────────────────────────────
export interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export interface UserModel extends Model<User, {}, UserMethods> {}

// ─── Service Return DTO ───────────────────────────────────────────────────────
// Step 37.7: Never expose raw Mongoose documents outside the service.
// This is the only shape that leaves the service layer.
export interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Service Input Types ──────────────────────────────────────────────────────
// Re-exported from validator schemas for use in the service layer.
export type { RegisterInput } from "../validators/register.validator";
export type { LoginInput } from "../validators/login.validator";
export type { UpdateProfileInput } from "../validators/updateProfile.validator";
