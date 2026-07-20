import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { type User, type UserMethods, type UserModel, UserRole } from "../types/user.types";

const userSchema = new Schema<User, UserModel, UserMethods>(
  {
    // Identity
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

    // Authentication
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
      select: false, // Step 35.7 Hide Password
    },

    // Contact
    phone: {
      type: String,
      trim: true,
    },

    // Profile
    avatar: {
      type: String,
      default: "default-avatar.png",
    },

    // Authorization
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.PLAYER,
    },

    // Account State
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Step 35.3 Timestamps
    toJSON: {
      transform: function (_doc, ret) {
        delete ret.password; // Step 35.7 Hide Password
        return ret;
      },
    },
  }
);

// Step 35.5 Never store plain passwords
userSchema.pre("save", async function () {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt);
});

// Step 35.6 Compare Password Method
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<User, UserModel>("User", userSchema);

export default User;
