import { Router } from "express";
const blogRouter = Router();
import {
  addblog,
  deleteBlogById,
  getBlogByCategory,
  getBlogById,
  getRelatedBlogs,
  getUserBlogs,
  updateBlog,
} from "../controllers/blogController.js";

blogRouter.post("/createblog", addblog);
blogRouter.get("/getblogs", getUserBlogs);
blogRouter.get("/getblog/:id", getBlogById);
blogRouter.get("/getblog-by-category/:categoryId", getBlogByCategory);
blogRouter.put("/update-blog/:id", updateBlog);
blogRouter.delete("/deleteblog/:id", deleteBlogById);
blogRouter.get("/get-related-blog/:category/:currentblog", getRelatedBlogs);

export { blogRouter };
