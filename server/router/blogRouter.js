import { Router } from "express";
const blogRouter = Router();
import {
  addblog,
  deleteBlogById,
  getBlogByCategory,
  getBlogById,
  getBlogByUser,
  getRelatedBlogs,
  getSerchedBlogs,
  getUserBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import upload from "../configurations/multerConfiguration.js";
import { userProtectedRoute } from "../middlewares/userProtectedRoute.js";

//user protected route
blogRouter.post(
  "/createblog",
  userProtectedRoute,
  upload.single("featuredImage"),
  addblog
);
blogRouter.get("/getblogs", getUserBlogs);
blogRouter.get("/get-user-blogs/:userid", userProtectedRoute, getBlogByUser);
blogRouter.put(
  "/update-blog/:id",
  userProtectedRoute,
  upload.single("featuredImage"),
  updateBlog
);
blogRouter.delete("/deleteblog/:id", userProtectedRoute, deleteBlogById);

/////public accesible route
blogRouter.get("/getblog-by-category/:categoryId", getBlogByCategory);
blogRouter.get("/get-related-blog/:category/:currentblog", getRelatedBlogs);
blogRouter.get("/search", getSerchedBlogs);
blogRouter.get("/getblog/:id", getBlogById);

export default blogRouter;
