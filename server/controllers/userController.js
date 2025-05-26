import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
      return res.status(401).json({ msg: "Wrong credentials" });
    }

    // Creating token
    const token = jwt.sign({ email: validUser.email }, tokenSecretCode);

    // Setting cookie - FIXED VERSION
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 60 * 1000, // 10 minutes in milliseconds
      // domain: Remove this line for localhost testing
    });

    res.status(200).json({
      msg: "Token set inside cookie",
      result: token,
    });
  } catch (error) {
    console.log("User login error", error);
    res.status(500).json({ msg: "Server error" });
  }
};

////user logout -----------------------------------------------
export const userLogOut = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "user logged successfully" });
};
