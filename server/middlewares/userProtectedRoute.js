import jwt from "jsonwebtoken";
import { handleError } from "../helper/errorHandler.js";

export const userProtectedRoute = async (req, res, next) => {
  try {
    console.log("No token provided");
    const token = req.cookies.token;
    if (!token) {
      return next(handleError(403, "no token"));
    }
    const verifiedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    // console.log("verifiedUser", verifiedUser);
    if (!verifiedUser || verifiedUser.userStatus !== "active") {
      return next(handleError(401, "authorized admin access"));
    }
    req.user = verifiedUser;
    // console.log("token", verifiedUser);
    next();
  } catch (error) {
    next(
      handleError(
        error.status || 500,
        error.message || "Authentication error, user"
      )
    );
  }
};
