import mongoose from "mongoose";
const avtarSchema = mongoose.Schema(
  {
    avtarName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avtarImage: {
      type: String,
      required: true,
      lowercase: true,
    },
  },

  { timestamps: true }
);

export const Avtar = mongoose.model("Avtar", userSchema);
