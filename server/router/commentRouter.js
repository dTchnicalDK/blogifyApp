import { Router } from "express";
import {
  createComment,
  deleteCommentById,
  getAllComments,
  getAllCommentsOfBlog,
  getAllCommentsOfUser,
  getCommentCount,
} from "../controllers/commentController.js";
const commentRouter = Router();

commentRouter.post("/create", createComment);
commentRouter.get("/get-all-comments/:blogId", getAllCommentsOfBlog);
commentRouter.get("/get-user-comments/:userid", getAllCommentsOfUser);
commentRouter.delete("/delete/:commentid", deleteCommentById);
commentRouter.get("/all-comments", getAllComments);
commentRouter.get("/comments-count/:blogid", getCommentCount);

export default commentRouter;
