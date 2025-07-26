import mongoose, { Types } from "mongoose";

const commentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentBlog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
      required: true,
    },
    comments: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Comments = mongoose.model("Comment", commentSchema, "Comments");
