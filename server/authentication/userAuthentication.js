import jwt from "jsonwebtoken";
import { handleError } from "../helper/errorHandler.js";

const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log("reqToken1", token);
  if (!token) {
    return next(handleError(404, "no token found"));
  }
  const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  if (!user) {
    return next(handleError((405, "not a valid token")));
  }
  res.status(200).json({ msg: "welcome token veryfication route", user: user });
};
export { authenticateUser };
