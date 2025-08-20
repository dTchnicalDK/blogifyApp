import { Router } from "express";
const blogRouter = Router();
import {
  addblog,
  deleteBlogById,
  getBlogByCategory,
  getBlogById,
  getRelatedBlogs,
  getSerchedBlogs,
  getUserBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import upload from "../configurations/multerConfiguration.js";

blogRouter.post("/createblog", upload.single("featuredImage"), addblog);
blogRouter.get("/getblogs", getUserBlogs);
blogRouter.get("/getblog/:id", getBlogById);
blogRouter.get("/getblog-by-category/:categoryId", getBlogByCategory);
blogRouter.put("/update-blog/:id", upload.single("featuredImage"), updateBlog);
blogRouter.delete("/deleteblog/:id", deleteBlogById);
blogRouter.get("/get-related-blog/:category/:currentblog", getRelatedBlogs);
blogRouter.get("/search", getSerchedBlogs);

export default blogRouter;
