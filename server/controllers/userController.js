import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleError } from "../helper/errorHandler.js";
import cloudinary from "../configurations/cloudinaryConfig.js";
import fs from "fs";
const tokenSecretCode = process.env.JWT_TOKEN_SECRET;

//------------------function to register user-----------------------------

export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("email and password", email, password);

  try {
    //validate for empty and already registered
    if (!email || !password) {
      return next(handleError(400, "Email and password are required"));
    }
    const isUserAlreadyRegistered = await User.findOne({ email });
    if (isUserAlreadyRegistered) {
      return next(handleError(400, "user already registered, please login"));
    }
    //hash password
    const hashedPwd = await bcrypt.hash(password, 12);
    // password = hashedPwd;
    //save to database and create user
    const createdUser = await User.create({ email, password: hashedPwd });
    console.log("createdUser", createdUser);

    return res.status(200).json({
      message: "user registered successfully",
      // user: createdUser.select("- password"),
      data: createdUser,
    });
  } catch (error) {
    console.log("user registration error", error);
    return next(
      handleError(
        error.status || 500,
        error.message || "internal server error, fetching user"
      )
    );
  }
};
//------------------function to get all users-----------------------------
export const getAllusers = async (req, res, next) => {
  // console.log("route hit");
  try {
    const fetchedUsers = await User.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    // console.log("fetchedUsers", fetchedUsers);
    res
      .status(200)
      .json({ success: true, message: "user fetched", data: fetchedUsers });
  } catch (error) {
    console.log("user registration error", error);
    next(
      handleError(
        error.status || 500,
        error.message || "internal server error, fetching user"
      )
    );
  }
};
//------------------function to get all users-----------------------------
export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const fetchedUsers = await User.findById(id);
    console.log("fetcged yser", fetchedUsers);
    res
      .status(200)
      .json({ success: true, message: "user fetched", data: fetchedUsers });
  } catch (error) {
    console.log("getting user by id error", error);
    next(
      handleError(
        error.status || 500,
        error.message || "internal server error, fetching user"
      )
    );
  }
};

//-----------------Method to Login user-----------------------------------
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the fields first" }); // 400 is more appropriate
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(401).json({ message: "Invalid credentials" }); // 401 for unauthorized
    }

    // Comparing password
    const matchedPassword = await bcrypt.compare(password, validUser.password);
    if (!matchedPassword) {
      return res.status(401).json({ message: "Wrong userId or Password!" });
    }

    // Creating token
    const token = jwt.sign(
      {
        userId: validUser._id,
        email: validUser.email,
        role: validUser.role,
        userStatus: validUser.userStatus,
      },
      tokenSecretCode,
      { expiresIn: "1h" }
    );

    //creating safe object to send in response without password
    const userObject = validUser.toObject();
    delete userObject.password;
    // console.log("object for response", userObject);

    // Setting cookie - FIXED VERSION
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 60 * 60 * 1000, // 24 hours in milliseconds
      // domain: Remove this line for localhost testing
    });

    res.status(200).json({
      message: "User logged in successfully !",
      user: userObject,
    });
  } catch (error) {
    console.log("User login error", error);
    next(
      handleError(
        error.status || 500,
        error.message || "internal server error, fetching user"
      )
    );
  }
};

////user logout -----------------------------------------------
export const userLogOut = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // ensure secure in production
      sameSite: "Strict", // or 'Lax' depending on your needs
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

////update profile -----------------------------------------------
export const updateProfile = async (req, res, next) => {
  const { _id, email, displayName, photoURL, bio, location } = req.body;
  const userOnDb = await User.findById({ _id });

  try {
    let uploadResult;
    if (req.file) {
      // Convert buffer to base64 for Cloudinary
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      // Upload to Cloudinary
      uploadResult = await cloudinary.uploader.upload(dataURI, {
        folder: "blogify/blogs",
        transformation: [
          { width: 1000, height: 750, crop: "limit" },
          { quality: "auto" },
          { format: "auto" },
        ],
      });
    }
    console.log("cloudinary link", uploadResult);

    const updatedProfile = await User.findByIdAndUpdate(
      _id,
      {
        displayName,
        photoURL: uploadResult?.secure_url,
        bio,
        location,
      },
      { new: true }
    ).select("-password");

    return res.status(201).json({
      message: "Profile Data updated successfully",
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

//------------------function delete users-----------------------------
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const suspendedUser = await User.findByIdAndUpdate(id, {
      userStatus: "suspended",
    });

    return res
      .status(200)
      .json({ message: "user deleted successfully!", data: suspendedUser });
  } catch (error) {
    console.log("user registration error", error);
    next(
      handleError(
        error.status || 500,
        error.message || "internal server error, fetching user"
      )
    );
  }
};
//------------------function reactivate users-----------------------------
export const reActivateUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const isSuspended = await User.findById(id);
    // console.log("suspended account", isSuspended);
    if (isSuspended.userStatus === "active") {
      return res.status(400).json({ message: "user is already active!" });
    }
    const suspendedUser = await User.findByIdAndUpdate(id, {
      userStatus: "active",
    });
    // console.log("suspended", suspendedUser);
    return res.status(200).json({ message: "user activated successfully!" });
  } catch (error) {
    console.log("user reActivation  error", error);
    next(
      handleError(
        error.status || 500,
        error.message || "internal server error, activating user"
      )
    );
  }
};
