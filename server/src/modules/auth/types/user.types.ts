import { Document, Model } from "mongoose";

export enum UserRole {
  PLAYER = "PLAYER",
  OWNER = "OWNER",
  ADMIN = "ADMIN",
}

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
