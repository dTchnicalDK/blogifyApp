import mongoose from "mongoose";
import { handleError } from "../helper/errorHandler.js";
import { Blog } from "../models/blogModel.js";
import { decode, encode } from "entities";
import jwt from "jsonwebtoken";
import { Categories } from "../models/categoriesModel.js";

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

    if (!createdBlog) {
      return next(handleError(500, "blog saving error"));
    }
    res.status(200).json({ message: "blog created successfully", createdBlog });
  } catch (error) {
    console.log("backend blog creation error", error);
    next(handleError(500, error.message));
  }
};
/////////////////////getting all blogs/////////////////////////
export const getUserBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "photoURL displayName") // avatar role
      .populate("category", "categoryName") //  slug
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    // console.log("blogs response", blogs);
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
  // console.log("get blog by id backend hit");
  const blogId = req.params;
  // console.log("blog id inside backend", blogId);
  try {
    const response = await Blog.findById({ _id: blogId.id })
      .populate("category", "categoryName")
      .populate("author", "displayName")
      .lean()
      .exec();
    // console.log("res", JSON.stringify(response));
    const sterlizedResponse = {
      ...response,
      blogContent: decode(response.blogContent),
    };
    res.status(200).json({
      message: "blog fetched from db",
      // data: response,
      data: sterlizedResponse,
    });
  } catch (error) {
    console.log("gettin blog by id error", error.message);
    next(handleError(error.status, error.message));
  }
};

///////////////editBlogById///////////////////////////////
export const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { blogContent, blogTitle, category } = req.body;

  try {
    // Basic validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID",
      });
    }

    if (!blogTitle || !blogContent || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and category are required",
      });
    }

    // Verify the category exists
    const categoryExists = await Categories.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { blogContent, blogTitle, category },
      {
        new: true,
      }
    );
    if (!updatedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    // console.log("update route hit, updatedBlog", updatedBlog);
    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    console.log("server error while editBlogById ", error);
    next(handleError(error.status, error.message));
  }
};

///////////////deleteBlogById///////////////////////////////
export const deleteBlogById = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "id not received at backend",
      success: false,
      // data: deletedData,
    });
  }
  const deletedData = await Blog.findByIdAndDelete(id);
  if (!deletedData) {
    res.status(500).json({
      msg: "failed to delete",
      success: false,
      // data: deletedData,
    });
  }

  res.status(200).json({
    message: "blog deleted successfully",
    data: deletedData,
  });
};
