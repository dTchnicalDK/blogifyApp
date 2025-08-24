import { Router } from "express";
import {
  createComment,
  getAllComments,
  getAllCommentsOfBlog,
  getCommentCount,
} from "../controllers/commentController.js";
const commentRouter = Router();

commentRouter.post("/create", createComment);
commentRouter.get("/get-all-comments/:blogId", getAllCommentsOfBlog);
commentRouter.get("/all-comments", getAllComments);
commentRouter.get("/comments-count/:blogid", getCommentCount);

export default commentRouter;
