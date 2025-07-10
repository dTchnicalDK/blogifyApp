import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateProfile,
  userLogOut,
} from "../controllers/userController.js";
import { authenticateUser } from "../authentication/userAuthentication.js";
import { registerGoogleUser } from "../controllers/googleUserController.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/register-google", registerGoogleUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", userLogOut);
userRouter.post("/update", updateProfile);

//secured route
userRouter.get("/authenticate", authenticateUser);

export default userRouter;
