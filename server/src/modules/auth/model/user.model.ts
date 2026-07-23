import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { type User, type UserMethods, type UserModel, UserRole, SkillLevel } from "../types/user.types";
import crypto from "crypto";

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: "default-avatar.png",
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.PLAYER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sportsInterests: {
      type: [String],
      default: [],
    },
    skillLevel: {
      type: String,
      enum: Object.values(SkillLevel),
    },
    preferredLocation: {
      type: String,
      trim: true,
    },
    notificationSettings: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      bookingUpdates: { type: Boolean, default: true },
      promotional: { type: Boolean, default: false },
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.password;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.emailVerificationToken;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  return resetToken;
};

userSchema.methods.createEmailVerificationToken = function (): string {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  this.emailVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
  return verificationToken;
};

const User = mongoose.model<User, UserModel>("User", userSchema);

export default User;
