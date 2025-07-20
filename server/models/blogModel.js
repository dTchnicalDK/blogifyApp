import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    blogTitle: { type: String, required: true, trim: true, unique: true },
    featuredImage: { type: String, default: "" },
    blogContent: { type: String, required: true },
    slug: { type: String, required: true, default: "default slug" },
  },
  { timestamps: true }
);
export const Blog = mongoose.model("Blog", blogSchema);
