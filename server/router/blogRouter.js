import { Router } from "express";
const blogRouter = Router();
import { addblog, getUserBlogs } from "../controllers/blogController.js";

blogRouter.post("/addblog", addblog);
blogRouter.get("/getblogs", getUserBlogs);

export { blogRouter, addblog };
