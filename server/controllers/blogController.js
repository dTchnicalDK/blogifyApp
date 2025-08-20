import mongoose from "mongoose";
import { handleError } from "../helper/errorHandler.js";
import { Blog } from "../models/blogModel.js";
import { decode, encode } from "entities";
import jwt from "jsonwebtoken";
import { Categories } from "../models/categoriesModel.js";
import cloudinary from "../configurations/cloudinaryConfig.js";

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

    // Upload an image to cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogify/blogs",
    });

    // console.log(uploadResult);
    //creating and saving data to database
    const blog = new Blog({
      author,
      blogTitle,
      blogContent,
      category,
      featuredImage: uploadResult.secure_url,
      // slug,
    });

    const createdBlog = await blog.save();

    if (!createdBlog) {
      return next(handleError(500, "blog saving error"));
    }
    res.status(200).json({
      message: "blog created successfully",
      createdBlog,
    });
  } catch (error) {
    console.log("backend blog creation error", error);
    next(handleError(error.status, error.message || "internal server error"));
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
      .populate("author", "displayName photoURL")
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

///////////////getBlogById///////////////////////////////
export const getBlogByCategory = async (req, res, next) => {
  // console.log("get blog by id backend hit");
  const { categoryId } = req.params;

  if (!categoryId) {
    return next(handleError(400, "send category name to fetch data be"));
  }

  try {
    const response = await Blog.find({ category: categoryId })
      .populate("category", "categoryName")
      .populate("author", "displayName photoURL")
      .lean()
      .exec();

    res.status(200).json({
      message: "category blog fetched from db",
      // data: response,
      data: response,
      success: true,
    });
  } catch (error) {
    console.log("gettin blog by id error", error.message);
    next(
      handleError(
        error.status,
        error.message || "internal server error, fetching category blog"
      )
    );
  }
};

///////////////editBlogById///////////////////////////////
export const updateBlog = async (req, res, next) => {
  const { id } = req.params;

  const { blogTitle, blogContent, category, author } = req.body;
  // const data = Object.fromEntries(req.body);
  console.log("blogs at be", id, blogContent, blogTitle, category, author);
  console.log("file at be", req.file);

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
    console.log("category found", categoryExists);

    // Upload an image to cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogify/blogs",
    });
    const updatedBlog = await Blog.findByIdAndUpdate(
      { _id: id },
      {
        blogContent,
        blogTitle,
        category,
        featuredImage: uploadResult.secure_url,
      },
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

/////////////////////getting Related Blogs/////////////////////////
export const getRelatedBlogs = async (req, res, next) => {
  const { category, currentblog } = req.params;

  console.log("related blog categories params", category, currentblog);
  try {
    const blogs = await Blog.find({
      category,
      _id: { $ne: currentblog },
    })
      .populate("author", "photoURL displayName") // avatar role
      .populate("category", "categoryName") //  slug
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    console.log("res blogs", blogs);
    // console.log("blogs response", blogs);
    if (!blogs && blogs.length <= 0) {
      return next(handleError(404, "no data found"));
    }
    res
      .status(200)
      .json({ message: "Related blogs Are:--", blogs, success: true });
  } catch (error) {
    console.log("getting blogs error", error);
    next(
      handleError(
        error.response.status || 500,
        error.response.message ||
          error.message ||
          "something went wrong, fetching related blog"
      )
    );
  }
};

/////////////////////searching  Blogs/////////////////////////
export const getSerchedBlogs = async (req, res, next) => {
  const { q } = req.query;

  try {
    if (!q || q.trim() == " ") {
      return next(handleError(400, "first, type something to search"));
    }
    const blogs = await Blog.find({
      $or: [
        { blogTitle: { $regex: q, $options: "i" } },
        { blogContent: { $regex: q, $options: "i" } },
      ],
    })

      .populate("author", "name avatar role")
      .populate("category", "name slug")
      .lean()
      .exec();
    if (blogs.length == 0) {
      return res
        .status(200)
        .json({ message: "no blogs matched", data: [], success: true });
    }
    res
      .status(200)
      .json({ message: "Related blogs Are:--", data: blogs, success: true });
  } catch (error) {
    console.log("searching blogs error", error);
    next(
      handleError(
        error.status || 500,
        error.message || "something went wrong, searching blogs"
      )
    );
  }
};
