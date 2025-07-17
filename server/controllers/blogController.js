import { handleError } from "../helper/errorHandler.js";
import { Blog } from "../models/blogModel.js";
import { encode } from "entities";
import jwt from "jsonwebtoken";

////////////////////////creating blog//////////////////////////////////////////////
export const addblog = async (req, res, next) => {
  const { blogTitle, blogContent, category, author } = req.body;

  // basic validation-----------------
  if (!blogTitle || !blogContent || !category || !author) {
    return next(400, "fill all the fields");
  }

  try {
    //checking if title alredy exits
    const sanitizedTitle = blogTitle.trim();
    const isDuplicateTitle = await Blog.findOne({ blogTitle: sanitizedTitle });
    if (isDuplicateTitle) {
      console.log("duplicate title");
      return next(handleError(903, "title already exits, choose another"));
    }
    //creating and saving data to database
    const blog = new Blog({
      author,
      blogTitle,
      blogContent: encode(blogContent),
      category,
      // featuredImage,
      // slug,
    });
    const createdBlog = await blog.save();
    console.log(`blog saved`, createdBlog);
    if (!createdBlog) {
      return next(handleError(500, "blog saving error"));
    }
    res.status(200).json({ msg: "data saved in db", createdBlog });
  } catch (error) {
    console.log("backend blog creation error", error);
    next(handleError(500, error.message));
  }
  // try {
  //   const { blogTitle, content, slug } = req.body;
  //   //   const { token } = req.cookie
  //   //   const tokenDecodedData = await jwt.verify(token, process.env.JWT_TOKEN_SECRET, )

  //   if (!blogTitle || !content) {
  //     return next(handleError(400, "Required fields can't be blank"));
  //   }
  //   // const createdBlog = { title, content };
  //   const blog = new Blog({
  //     blogTitle,
  //     content,
  //     slug: slug
  //       ? `${slug}-${Math.floor(Math.random() * 1000 + 1)}`
  //       : undefined,
  //   });
  //   const createdBlog = await blog.save();

  //   res.status(201).json({ msg: "your createdblog is", createdBlog });
  // } catch (error) {
  //   console.log("server error while adding blog", error);
  //   next(handleError(500, error.message));
  // }
};
/////////////////////getting all blogs/////////////////////////
export const getUserBlogs = async (req, res, next) => {
  // const { author } = req.body;
  try {
    const blogs = await Blog.find()
      .populate("author", "displayName") // avatar role
      .populate("category", "categoryName") //  slug
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    console.log("blogs response", blogs);
    if (!blogs && blogs.length <= 0) {
      return next(handleError(404, "no data found"));
    }
    res.status(200).json({ message: "your blogs are", blogs });
  } catch (error) {
    console.log("getting blogs error", error);
    next(handleError(500, error.message));
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
