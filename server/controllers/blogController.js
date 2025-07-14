import { handleError } from "../helper/errorHandler.js";
import { Blog } from "../models/blogModel.js";
import jwt from "jsonwebtoken";

////////////////////////creating blog//////////////////////////////////////////////
export const addblog = async (req, res, next) => {
  try {
    const { blogTitle, content, slug } = req.body;
    //   const { token } = req.cookie
    //   const tokenDecodedData = await jwt.verify(token, process.env.JWT_TOKEN_SECRET, )

    if (!blogTitle || !content) {
      return next(handleError(400, "Required fields can't be blank"));
    }
    // const createdBlog = { title, content };
    const blog = new Blog({
      blogTitle,
      content,
      slug: slug
        ? `${slug}-${Math.floor(Math.random() * 1000 + 1)}`
        : undefined,
    });
    const createdBlog = await blog.save();

    res.status(201).json({ msg: "your createdblog is", createdBlog });
  } catch (error) {
    console.log("server error while adding blog", error);
    next(handleError(500, error.message));
  }
};
/////////////////////getting all blogs/////////////////////////
export const getUserBlogs = async (req, res) => {
  const { owner } = req.body;
  try {
    if (!owner) {
      res.status(404).json({ msg: "login first, no owner found" });
    }
    const blogs = await Blog.find({ owner });
    if (!blogs) {
      res.status(404).json({ msg: "no blogs created yet, create new one" });
    }
    res.status(200).json({ msg: "your blogs are", blogs });
  } catch (error) {
    console.log("getting blogs error", error);
  }
};

///////////////getBlogById///////////////////////////////
export const getBlogById = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("server error while getting blog", error);
  }
};

///////////////editBlogById///////////////////////////////
export const editBlogById = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("server error while editBlogById ", error);
  }
};

///////////////deleteBlogById///////////////////////////////
export const deleteBlogById = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("server error while deleteBlogById ", error);
  }
};
