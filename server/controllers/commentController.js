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

    const resp = await commentData.save();

    res
      .status(201)
      .json({ messsage: "comment saved successfully", data: resp });
  } catch (error) {
    next(handleError(500, "internal server error"));
  }
};
