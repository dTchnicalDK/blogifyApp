import { Blog } from "../models/blogModel.js";
import jwt from "jsonwebtoken";

////////////////////////creating blog//////////////////////////////////////////////
export const addblog = async (req, res) => {
  const { title, content, owner } = req.body;
  //   const { token } = req.cookie
  //   const tokenDecodedData = await jwt.verify(token, process.env.JWT_TOKEN_SECRET, )

  if (!title || !content || !owner) {
    return res.status(400).json({ msg: "check title or content is empty" });
  }
  const createdBlog = await Blog.create({ title, content, owner });
  res.status(200).json({ msg: "add blog hit", createdBlog });
  res.status(200).json({ msg: "add blog hit" });
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
