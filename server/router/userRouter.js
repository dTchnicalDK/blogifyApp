import { Router } from "express";
import {
  loginUser,
  registerUser,
  userLogOut,
} from "../controllers/userController.js";
import { authenticateUser } from "../authentication/userAuthentication.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", userLogOut);

//secured route
userRouter.get("/authenticate", authenticateUser);

export default userRouter;
