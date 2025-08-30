import { Router } from "express";
import {
  createComment,
  deleteCommentById,
  getAllComments,
  getAllCommentsOfBlog,
  getAllCommentsOfUser,
  getCommentCount,
} from "../controllers/commentController.js";
import { userProtectedRoute } from "../middlewares/userProtectedRoute.js";
import { onlyAdminRoute } from "../middlewares/onlyAdminRoute.js";
const commentRouter = Router();

commentRouter.get("/get-all-comments/:blogId", getAllCommentsOfBlog);
commentRouter.get("/comments-count/:blogid", getCommentCount);
////////////////user protected route/////////////////
commentRouter.post("/create", userProtectedRoute, createComment);
commentRouter.get(
  "/get-user-comments/:userid",
  userProtectedRoute,
  getAllCommentsOfUser
);
commentRouter.delete(
  "/delete/:commentid",
  userProtectedRoute,
  deleteCommentById
);

/////////// only admin route//////////////////////
commentRouter.get("/all-comments", onlyAdminRoute, getAllComments);
export default commentRouter;
