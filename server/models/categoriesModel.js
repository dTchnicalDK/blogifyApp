import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    categoryName: { type: String, required: true, trim: true, unique: true },
    categorySlug: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

export const Categories = mongoose.model("categories", CategorySchema);
