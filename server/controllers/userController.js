import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { handleError } from "../helper/errorHandler.js";
import cloudinary from "../configurations/cloudinaryConfig.js";
const tokenSecretCode = process.env.JWT_TOKEN_SECRET;

//------------------function to register user-----------------------------
export const registerUser = async (req, res) => {
  let { email, password } = req.body;
  //grab form data

  try {
    //validate for empty and already registered
    if (!email || !password) {
      return res.status(200).json({ msg: "fill all the fields first" });
    }
    const isUserAlredyRegistered = await User.findOne({ email });
    if (isUserAlredyRegistered) {
      return res
        .status(200)
        .json({ msg: "user already registered, please login" });
    }
    //hash password
    const hashedPwd = await bcrypt.hash(password, 8);
    password = hashedPwd;
    //save to database and create user
    const createdUser = await User.create({ email, password });
    res.status(200).json({
      msg: "user registered successfully",
      // user: createdUser.select("- password"),
    });
  } catch (error) {
    console.log("user registration error", error);
  }
};

//-----------------Method to Login user-----------------------------------
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Fill all the fields first" }); // 400 is more appropriate
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(401).json({ msg: "Wrong credentials" }); // 401 for unauthorized
    }

    // Comparing password
    const matchedPassword = await bcrypt.compare(password, validUser.password);
    if (!matchedPassword) {
      return res
        .status(401)
        .json({ msg: "Wrong credentials, Check userId and Password!" });
    }

    // Creating token
    const token = jwt.sign({ email: validUser.email }, tokenSecretCode);

    //creating safe object to send in response without password
    const userObject = validUser.toObject();
    delete userObject.password;
    // console.log("object for response", userObject);

    // Setting cookie - FIXED VERSION
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 60 * 1000, // 10 minutes in milliseconds
      // domain: Remove this line for localhost testing
    });

    res.status(200).json({
      msg: "User logged in successfully !",
      user: userObject,
    });
  } catch (error) {
    console.log("User login error", error);
    res.status(500).json({ msg: "Server error" });
  }
};

////user logout -----------------------------------------------
export const userLogOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "user loggedOut successfully" });
};

////update profile -----------------------------------------------
export const updateProfile = async (req, res, next) => {
  const { _id, email, displayName, photoURL, bio, location } = req.body;
  // console.log("req.body", _id, email, displayName, photoURL, bio, location);
  const userOnDb = await User.findById({ _id });
  console.log("user got from db", userOnDb);
  try {
    // Upload an image to cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogify/profiles",
    });
    // photoURL: uploadResult.secure_url;
    const updatedProfile = await User.findByIdAndUpdate(
      _id,
      {
        displayName,
        photoURL: uploadResult.secure_url,
        bio,
        location,
      },
      { new: true }
    ).select("-password");
    console.log("updated profile", updateProfile);
    res.status(201).json({
      msg: "Profile Data updated successfully",
      success: true,
      data: updatedProfile,
    });
  } catch (error) {
    console.log("profile update error", error);
    next(
      handleError(
        error.status,
        error.message || "profile update, internal server error"
      )
    );
  }
};
