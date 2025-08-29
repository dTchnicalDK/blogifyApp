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

//////getting all comments///////
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comments.find()
      .populate("parentBlog", "blogTitle")
      .populate("author", "photoURL displayName email")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    // console.log("comments fetched at be", comments);
    res.status(201).json({ message: "comments fetched", data: comments });
  } catch (error) {
    console.log("get commnet error", error);
    next(
      handleError(
        error.status || 500,
        error.response?.messsage || error.messsage || "internal server error"
      )
    );
  }
};

//////comment count of blog///////
export const getCommentCount = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    // console.log("blogid", blogid);
    //   ---basic validations----
    if (!blogid) {
      return next(400, "required fields are missing!");
    }
    const commentCount = await Comments.countDocuments({ parentBlog: blogid });
    res
      .status(201)
      .json({ messsage: "get comment route hit", data: commentCount });
  } catch (error) {
    console.log("get commnet error", error);
    next(
      handleError(
        error.status || 500,
        error.response?.messsage || error.messsage || "internal server error"
      )
    );
  }
};

/////////////////AllComments of blog////////////////
export const getAllCommentsOfBlog = async (req, res, next) => {
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

/////////////////AllComments of A User////////////////
export const getAllCommentsOfUser = async (req, res, next) => {
  const { userid } = req.params;
  try {
    //   ---basic validations----
    if (!userid) {
      return next(400, "required fields are missing!");
    }

    const fetchedComments = await Comments.find({ author: userid })
      .populate("author", "displayName photoURL")
      .populate("parentBlog", "blogTitle")
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    res
      .status(201)
      .json({ messsage: "get User comment route hit", data: fetchedComments });
  } catch (error) {
    console.log("get user commnet error", error);
    next(
      handleError(
        500,
        error.response.messsage || "user comment, internal server error"
      )
    );
  }
};

///////////////deleteCommentById///////////////////////////////
export const deleteCommentById = async (req, res, next) => {
  const { commentid } = req.params;
  try {
    if (!commentid) {
      return res.status(400).json({
        message: "commentid not received at backend",
        success: false,
      });
    }
    const deletedData = await Comments.findByIdAndDelete(commentid);
    res.status(200).json({
      message: "comment deleted successfully",
      data: deletedData,
    });
  } catch (error) {
    next(
      handleError(
        error.status || 500,
        error.message || error.msg || "server error! comment delete"
      )
    );
  }
};
