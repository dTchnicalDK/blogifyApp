import { Router } from "express";
const blogRouter = Router();
import {
  addblog,
  deleteBlogById,
  getBlogById,
  getUserBlogs,
} from "../controllers/blogController.js";

blogRouter.post("/createblog", addblog);
blogRouter.get("/getblogs", getUserBlogs);
blogRouter.put("/getblog/:id", getBlogById);
blogRouter.delete("/deleteblog/:id", deleteBlogById);

export { blogRouter };
