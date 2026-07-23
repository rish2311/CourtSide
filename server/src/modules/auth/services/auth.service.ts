import crypto from "crypto";
import User from "../model/user.model";
import { ApiError } from "../../../shared/errors";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../utils/jwt";
import type {
  UserDTO,
  RegisterInput,
  LoginInput,
  UpdateProfileInput,
} from "../types/user.types";
import type {
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from "../validators/updateProfile.validator";
import type { User as UserDocument } from "../types/user.types";

function toDTO(user: UserDocument): UserDTO {
  return {
    id: (user._id as unknown as string).toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    role: user.role,
    isVerified: user.isVerified,
    isActive: user.isActive,
    sportsInterests: user.sportsInterests,
    skillLevel: user.skillLevel,
    preferredLocation: user.preferredLocation,
    notificationSettings: user.notificationSettings,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function register(dto: RegisterInput): Promise<UserDTO> {
  const emailTaken = await User.exists({ email: dto.email });
  if (emailTaken) {
    throw ApiError.conflict("An account with this email already exists", {
      email: ["Email is already registered"],
    });
  }

  const usernameTaken = await User.exists({ username: dto.username });
  if (usernameTaken) {
    throw ApiError.conflict("This username is already taken", {
      username: ["Username is already in use"],
    });
  }

  const user = await User.create({
    firstName: dto.firstName,
    lastName: dto.lastName,
    username: dto.username,
    email: dto.email,
    password: dto.password,
  });

  return toDTO(user);
}

export async function login(
  dto: LoginInput
): Promise<{ user: UserDTO; accessToken: string; refreshToken: string }> {
  const user = await User.findOne({ email: dto.email }).select("+password");
  if (!user) throw ApiError.unauthorized("Invalid email or password");

  const isPasswordValid = await user.comparePassword(dto.password);
  if (!isPasswordValid) throw ApiError.unauthorized("Invalid email or password");

  const payload = {
    userId: (user._id as unknown as string).toString(),
    role: user.role,
  };

  return {
    user: toDTO(user),
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

export async function getCurrentUser(userId: string): Promise<UserDTO> {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User account not found");
  return toDTO(user);
}

export async function updateProfile(
  userId: string,
  dto: UpdateProfileInput
): Promise<UserDTO> {
  const allowedUpdates: Record<string, unknown> = {};
  if (dto.firstName !== undefined) allowedUpdates.firstName = dto.firstName;
  if (dto.lastName !== undefined) allowedUpdates.lastName = dto.lastName;
  if (dto.phone !== undefined) allowedUpdates.phone = dto.phone;
  if (dto.avatar !== undefined) allowedUpdates.avatar = dto.avatar;
  if (dto.sportsInterests !== undefined) allowedUpdates.sportsInterests = dto.sportsInterests;
  if (dto.skillLevel !== undefined) allowedUpdates.skillLevel = dto.skillLevel;
  if (dto.preferredLocation !== undefined) allowedUpdates.preferredLocation = dto.preferredLocation;

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: allowedUpdates },
    { returnDocument: "after", runValidators: true }
  );
  if (!user) throw ApiError.notFound("User account not found");
  return toDTO(user);
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const decoded = verifyRefreshToken(refreshToken);
  const user = await User.findById(decoded.userId);
  if (!user || !user.isActive) {
    throw ApiError.unauthorized("User not found or inactive");
  }

  const payload = {
    userId: (user._id as unknown as string).toString(),
    role: user.role,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

export async function forgotPassword(dto: ForgotPasswordInput): Promise<void> {
  const user = await User.findOne({ email: dto.email });
  if (!user) return;

  user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
}

export async function resetPassword(dto: ResetPasswordInput): Promise<void> {
  const hashedToken = crypto.createHash("sha256").update(dto.token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  }).select("+password");

  if (!user) {
    throw ApiError.badRequest("Token is invalid or has expired");
  }

  user.password = dto.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
}

export async function verifyEmail(dto: VerifyEmailInput): Promise<void> {
  const hashedToken = crypto.createHash("sha256").update(dto.token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
  });

  if (!user) {
    throw ApiError.badRequest("Verification token is invalid");
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();
}
