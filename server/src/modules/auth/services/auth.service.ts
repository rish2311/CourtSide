import User from "../model/user.model";
import { ApiError } from "../../../shared/errors";
import { generateAccessToken } from "../../../utils/jwt";
import type {
  UserDTO,
  RegisterInput,
  LoginInput,
  UpdateProfileInput,
} from "../types/user.types";
import type { User as UserDocument } from "../types/user.types";

// ─── Private Helpers ──────────────────────────────────────────────────────────

/**
 * Step 37.7: Converts a raw Mongoose User document into a sanitized DTO.
 * Password is always excluded. Only safe, necessary fields are returned.
 * This is the ONLY shape that should ever leave the service layer.
 */
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
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

// ─── Auth Service ─────────────────────────────────────────────────────────────
// Step 37: This is the brain of the authentication domain.
// It contains all business logic. No HTTP primitives (req, res, status codes,
// cookies) are ever touched here — those belong strictly in the controller.

// ─── Step 37.2 — register ─────────────────────────────────────────────────────
/**
 * Registers a new user account.
 *
 * Flow:
 *   1. Check email uniqueness
 *   2. Check username uniqueness
 *   3. Create user (bcrypt hashing happens inside the model pre-save hook)
 *   4. Return sanitized DTO — no token on register (force explicit login)
 */
export async function register(dto: RegisterInput): Promise<UserDTO> {
  // 1. Email uniqueness check
  const emailTaken = await User.exists({ email: dto.email });
  if (emailTaken) {
    // Step 37.6: Throw a domain error. The global error middleware converts it.
    throw ApiError.conflict("An account with this email already exists", {
      email: ["Email is already registered"],
    });
  }

  // 2. Username uniqueness check
  const usernameTaken = await User.exists({ username: dto.username });
  if (usernameTaken) {
    throw ApiError.conflict("This username is already taken", {
      username: ["Username is already in use"],
    });
  }

  // 3. Create user — the model's pre-save hook hashes the password automatically
  const user = await User.create({
    firstName: dto.firstName,
    lastName: dto.lastName,
    username: dto.username,
    email: dto.email,
    password: dto.password,
  });

  // 4. Return DTO — password never leaves this layer
  return toDTO(user);
}

// ─── Step 37.3 — login ───────────────────────────────────────────────────────
/**
 * Authenticates a user and issues an access token.
 *
 * Flow:
 *   1. Find user by email (explicitly select password for comparison)
 *   2. Throw a generic auth error if not found (no email enumeration)
 *   3. Compare provided password against bcrypt hash
 *   4. Generate JWT access token
 *   5. Return DTO + token — the controller decides how to deliver the token
 *
 * Security note: We return the same error for "user not found" and
 * "wrong password" to prevent email enumeration attacks.
 */
export async function login(
  dto: LoginInput
): Promise<{ user: UserDTO; accessToken: string }> {
  // 1. Find user — re-select password since it's excluded by default (select:false)
  const user = await User.findOne({ email: dto.email }).select("+password");

  // 2. Generic auth error for user-not-found (prevents email enumeration)
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  // 3. Compare password using the instance method defined in the model
  const isPasswordValid = await user.comparePassword(dto.password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  // 4. Generate access token — Step 38 JWT utility
  const accessToken = generateAccessToken({
    userId: (user._id as unknown as string).toString(),
    role: user.role,
  });

  // 5. Return sanitized user + token (no raw document, no password)
  return { user: toDTO(user), accessToken };
}

// ─── Step 37.4 — getCurrentUser ──────────────────────────────────────────────
/**
 * Fetches the latest user document for an authenticated request.
 *
 * The auth middleware will attach req.user.userId after verifying the JWT.
 * This method hits MongoDB to return fresh, up-to-date data — never stale
 * cached data from the token payload.
 */
export async function getCurrentUser(userId: string): Promise<UserDTO> {
  const user = await User.findById(userId);

  if (!user) {
    // Could happen if an account was deleted after the JWT was issued
    throw ApiError.notFound("User account not found");
  }

  return toDTO(user);
}

// ─── Step 37.5 — updateProfile ───────────────────────────────────────────────
/**
 * Updates allowed profile fields for an authenticated user.
 *
 * Allowed fields: firstName, lastName, phone, avatar
 * Explicitly forbidden via Zod schema AND this service: email, password,
 * role, isVerified, isActive — these can never be changed via this endpoint.
 */
export async function updateProfile(
  userId: string,
  dto: UpdateProfileInput
): Promise<UserDTO> {
  // Explicitly whitelist allowed fields — even if the validator is bypassed,
  // the service enforces the boundary here as a defence-in-depth measure.
  const allowedUpdates: Partial<UpdateProfileInput> = {};
  if (dto.firstName !== undefined) allowedUpdates.firstName = dto.firstName;
  if (dto.lastName !== undefined) allowedUpdates.lastName = dto.lastName;
  if (dto.phone !== undefined) allowedUpdates.phone = dto.phone;
  if (dto.avatar !== undefined) allowedUpdates.avatar = dto.avatar;

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: allowedUpdates },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  if (!user) {
    throw ApiError.notFound("User account not found");
  }

  return toDTO(user);
}
