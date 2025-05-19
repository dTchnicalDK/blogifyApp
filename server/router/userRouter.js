import { Router } from "express";
import {
  loginUser,
  registerUser,
  userLogOut,
} from "../controllers/userController.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", userLogOut);

export default userRouter;
