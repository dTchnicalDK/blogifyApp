import mongoose from "mongoose";
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
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
