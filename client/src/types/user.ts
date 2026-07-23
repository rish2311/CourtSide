export const UserRole = {
  PLAYER: "PLAYER",
  OWNER: "OWNER",
  ADMIN: "ADMIN",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const SkillLevel = {
  BEGINNER: "BEGINNER",
  INTERMEDIATE: "INTERMEDIATE",
  ADVANCED: "ADVANCED",
  PROFESSIONAL: "PROFESSIONAL",
} as const;
export type SkillLevel = (typeof SkillLevel)[keyof typeof SkillLevel];

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  bookingUpdates: boolean;
  promotional: boolean;
}

export interface User {
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
  sportsInterests?: string[];
  skillLevel?: SkillLevel;
  preferredLocation?: string;
  notificationSettings?: NotificationSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  sportsInterests?: string[];
  skillLevel?: SkillLevel;
  preferredLocation?: string;
  notificationSettings?: NotificationSettings;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
