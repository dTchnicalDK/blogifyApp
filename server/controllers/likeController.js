import { handleError } from "../helper/errorHandler.js";
import { Like } from "../models/likeModel.js";

/////////create like & unlike/////////
export const doLike = async (req, res, next) => {
  try {
    const { blogId, userId } = req.body;
    // console.log("blogId", blogId);
    if (!blogId || !userId) {
      return next(handleError(400, "no userid or blogid"));
    }

    //checking already liked
    const alredyLiked = await Like.findOne({ likedBy: userId });
    if (alredyLiked) {
      const doUnlike = await Like.findByIdAndDelete(alredyLiked._id);
      return res.status(201).json({
        success: true,
        message: "blog unliked by deleting usr details",
        data: "unliked",
      });
    }
    // --------actually creating entry for like------------------
    const likeData = new Like({ parentBlog: blogId, likedBy: userId });
    const savedData = await likeData.save();

    res.status(200).json({
      success: true,
      message: "blog liked successfully",
      data: "liked",
    });
  } catch (error) {
    console.log("error fetching doLike", error);
    next(
      handleError(error.status || 500, error.message || "like fetching error")
    );
  }
};

/////////like & comment count of blog(id)/////////
export const likeCount = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    if (!blogid) {
      return next(400, "blod id needed to count likes");
    }
    const likeCount = await Like.countDocuments();
    res
      .status(200)
      .json({ success: true, message: "like count fetched", data: likeCount });
  } catch (error) {
    console.log("error fetching likeCount", error);
    next(
      handleError(error.status || 500, error.message || "like fetching error")
    );
  }
};

/////////like & comment count of blog(id)///////// working
export const commentCount = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    if (!blogid) {
      return next(400, "blod id needed to count likes");
    }
    const likeCount = await Like.countDocuments();
    res
      .status(200)
      .json({ success: true, message: "like count fetched", data: likeCount });
  } catch (error) {
    console.log("error fetching likeCount", error);
    next(
      handleError(error.status || 500, error.message || "like fetching error")
    );
  }
};
