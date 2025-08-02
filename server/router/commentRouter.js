import { Router } from "express";
import {
  createComment,
  getAllComments,
} from "../controllers/commentController.js";
const commentRouter = Router();

commentRouter.post("/create", createComment);
commentRouter.get("/get-all-comments/:blogId", getAllComments);

export default commentRouter;
