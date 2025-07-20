import { Router } from "express";
const blogRouter = Router();
import {
  addblog,
  deleteBlogById,
  getBlogById,
  getUserBlogs,
  updateBlog,
} from "../controllers/blogController.js";

blogRouter.post("/createblog", addblog);
blogRouter.get("/getblogs", getUserBlogs);
blogRouter.get("/getblog/:id", getBlogById);
blogRouter.put("/update-blog/:id", updateBlog);
blogRouter.delete("/deleteblog/:id", deleteBlogById);

export { blogRouter };
