import { handleError } from "../helper/errorHandler.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
const tokenSecretCode = process.env.JWT_TOKEN_SECRET;

// Fields to remove from user responses
const SENSITIVE_FIELDS = ["password", "provider", "__v"];

// Helper function to sanitize user object
const sanitizeUser = (user) => {
  const userObj = user.toObject();
  SENSITIVE_FIELDS.forEach((field) => delete userObj[field]);
  return userObj;
};

export const registerGoogleUser = async (req, res, next) => {
  try {
    const { uid, email, displayName, photoURL, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ uid });
    // console.log("user from db", user);

    if (!user) {
      // Create new user
      user = new User({
        uid,
        email,
        displayName,
        photoURL,
        password,
      });
      await user.save();
    }
    //   //remove user password
    const userWithoutPassword = sanitizeUser(user);
    // Creating token
    const token = jwt.sign(userWithoutPassword, tokenSecretCode);

    // Setting cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 60 * 1000, // 10 minutes in milliseconds
      // domain: Remove this line for localhost testing
    });

    res.status(200).json({
      msg: "User logged in successfully !",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    next(
      handleError(err.status || 500, err.message || "google login server error")
    );
    // res.status(500).json({ error: "Server error" });
  }
};
