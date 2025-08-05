import mongoose, { Types } from "mongoose";

const LikeSchema = mongoose.Schema({
  parentBlog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export const Like = mongoose.model("like", LikeSchema, "likes");
