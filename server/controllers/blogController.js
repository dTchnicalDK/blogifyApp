import mongoose from "mongoose";
import { handleError } from "../helper/errorHandler.js";
import { Blog } from "../models/blogModel.js";
import { decode, encode } from "entities";
import jwt from "jsonwebtoken";
import { Categories } from "../models/categoriesModel.js";
import cloudinary from "../configurations/cloudinaryConfig.js";

////////////////////////creating blog//////////////////////////////////////////////
// controllers/blogController.js
export const addblog = async (req, res, next) => {
  console.log("Add blog route hit");
  const { blogTitle, blogContent, category, author } = req.body;

  // Basic validation
  if (!blogTitle || !blogContent || !category || !author) {
    return next(handleError(400, "Please fill all the required fields"));
  }

  // Check if file was uploaded
  if (!req.file) {
    return next(handleError(400, "Featured image is required"));
  }

  try {
    // Check if title already exists
    const sanitizedTitle = blogTitle.trim();
    const isDuplicateTitle = await Blog.findOne({
      blogTitle: new RegExp(`^${sanitizedTitle}$`, "i"),
    });

    if (isDuplicateTitle) {
      return next(handleError(409, "A blog with this title already exists"));
    }

    // Convert buffer to base64 for Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: "blogify/blogs",
      transformation: [
        { width: 1000, height: 750, crop: "limit" },
        { quality: "auto" },
        { format: "auto" },
      ],
    });

    // Create and save blog to database
    const blog = new Blog({
      author,
      blogTitle: sanitizedTitle,
      blogContent,
      category,
      featuredImage: uploadResult.secure_url,
    });

    const createdBlog = await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: createdBlog,
    });
  } catch (error) {
    console.error("Backend blog creation error:", error);

    if (error.code === 11000) {
      return next(handleError(409, "A blog with this title already exists"));
    }

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return next(handleError(400, errors.join(", ")));
    }

    next(handleError(500, "Internal server error"));
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

///////////////getBlogByCategory///////////////////////////////
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

///////////////getBlogByUser///////////////////////////////
export const getBlogByUser = async (req, res, next) => {
  const { userid } = req.params;
  if (!userid) {
    return next(handleError(400, "userid not needed to get data"));
  }

  try {
    const response = await Blog.find({ author: userid })
      .populate("category", "categoryName")
      .populate("author", "displayName photoURL")
      .lean()
      .exec();

    res.status(200).json({
      message: "blogs of user fetched from db",
      data: response,
      success: true,
    });
  } catch (error) {
    console.log("getting blog by user error", error.message);
    next(
      handleError(
        error.status,
        error.message || "internal server error, fetching user blog"
      )
    );
  }
};

///////////////editBlogById///////////////////////////////
export const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;
  const reqdata = JSON.parse(data);

  try {
    // Basic validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id needed to fetch be",
      });
    }
    if (!reqdata.blogTitle || !reqdata.blogContent || !reqdata.category) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and category are required",
      });
    }

    // Verify the category exists
    const categoryExists = await Categories.findById(reqdata.category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    // Upload an image to cloudinary
    let uploadResult = null;
    if (req.file) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "blogify/blogs",
      });
    }

    const dataToReplaceWith = {
      ...reqdata,
      featuredImage: uploadResult?.secure_url || reqdata.featuredImage,
      category: reqdata.category._id ? reqdata.category._id : reqdata.category,
    };

    // console.log("dataToReplaceWith", dataToReplaceWith);
    const updatedBlog = await Blog.findByIdAndUpdate(id, dataToReplaceWith, {
      new: true,
    });

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
  try {
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
  } catch (error) {
    next(
      handleError(
        error.status || 500,
        error.message || error.msg || "internal server error! deleting blog"
      )
    );
  }
};

/////////////////////getting Related Blogs/////////////////////////
export const getRelatedBlogs = async (req, res, next) => {
  const { category, currentblog } = req.params;

  // console.log("related blog categories params", category, currentblog);
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
    // console.log("res blogs", blogs);
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
