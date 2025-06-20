import jwt from "jsonwebtoken";

const authenticateUser = async (req, res) => {
  const { token } = req.cookies;
  console.log("reqToken1", token);
  const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  res.status(200).json({ msg: "welcome token veryfication route", user: user });
};
export { authenticateUser };
