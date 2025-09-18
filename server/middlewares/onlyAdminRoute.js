import jwt from "jsonwebtoken";
import { handleError } from "../helper/errorHandler.js";

export const onlyAdminRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(handleError(401, "No token provided"));
    }
    const verifiedUser = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    if (
      !verifiedUser ||
      verifiedUser.userStatus !== "active" ||
      verifiedUser.role !== "admin"
    ) {
      return next(handleError(401, "Only Admin Allowed"));
    }
    req.user = verifiedUser;
    next();
  } catch (error) {
    next(
      handleError(error.status || 500, error.message || "Authentication error")
    );
  }
};
