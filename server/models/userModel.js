import mongoose from "mongoose";
import { type } from "os";
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    uid: { type: String, unique: true }, // Firebase UID
    displayName: { type: String },
    photoURL: { type: String },
    provider: { type: String, default: "nonGoogle" },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    Mobile: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    userStatus: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
