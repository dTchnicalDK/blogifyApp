import jwt from "jsonwebtoken";
import { handleError } from "../helper/errorHandler.js";

export const userProtectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.clearCookie("token");
      return next(handleError(401, "no token"));
    }
    const verifiedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    if (!verifiedUser || verifiedUser.userStatus !== "active") {
      res.clearCookie("token");
      return next(handleError(401, "Only logged user allowed"));
    }
    req.user = verifiedUser;
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
