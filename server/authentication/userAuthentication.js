import jwt from "jsonwebtoken";
import { handleError } from "../helper/errorHandler.js";

const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      res.clearCookie("token");
      return res.status(401).json({ msg: "no token! Loing first", user: null });
    }
    const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

    if (!user) {
      res.clearCookie("token");
      return res
        .status(401)
        .json({ msg: "no user info ! Loing first", user: null });
    }
    res
      .status(200)
      .json({ msg: "welcome token veryfication route", user: user });
  } catch (error) {
    console.log("user authention error", error);
    next(
      handleError(error.status || 500, error.message || "internal server error")
    );
  }
};
export { authenticateUser };
