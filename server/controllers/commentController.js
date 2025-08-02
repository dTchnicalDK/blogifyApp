import { handleError } from "../helper/errorHandler.js";
import { Comments } from "../models/commentModel.js";

/////////create comment////////////////
export const createComment = async (req, res, next) => {
  try {
    const { author, blog, comment } = req.body;
    //   ---basic validations----
    if (!author || !blog || !comment || comment.trim().length <= 1) {
      return next(400, "all fields are mandatory, write comment first!");
    }

    const commentData = new Comments({
      author: author,
      parentBlog: blog,
      comments: comment,
    });
    // console.log("comment data send to server", commentData);
    const resp = await commentData.save();
    // console.log("comment res from db", resp);

    res
      .status(201)
      .json({ messsage: "comment saved successfully", data: resp });
  } catch (error) {
    next(handleError(500, "internal server error"));
  }
};

//////getting all commnets of blog///////
export const getAllComments = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    //   ---basic validations----
    if (!blogId) {
      return next(400, "required fields are missing!");
    }

    const fetchedComments = await Comments.find({ parentBlog: blogId })
      .populate("author", "displayName photoURL")
      // .populate("Blog", "author blogTitle")
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res
      .status(201)
      .json({ messsage: "get comment route hit", data: fetchedComments });
  } catch (error) {
    console.log("get commnet error", error);
    next(handleError(500, error.response.messsage || "internal server error"));
  }
};
