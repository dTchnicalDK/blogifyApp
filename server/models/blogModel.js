import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    blogTitle: { type: String, required: true, trim: true },
    featuredImage: { type: String, default: "" },
    BlogContent: { type: String, required: true },
    slug: { type: String, required: true, default: "default slug" },
  },
  { timestamps: true }
);
export const Blog = mongoose.model("blog", blogSchema);
