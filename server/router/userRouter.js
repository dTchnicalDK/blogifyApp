import { Router } from "express";
import {
  deleteUser,
  getAllusers,
  getUserById,
  loginUser,
  reActivateUser,
  registerUser,
  updateProfile,
  userLogOut,
} from "../controllers/userController.js";
import upload from "../configurations/multerConfiguration.js";

import { authenticateUser } from "../authentication/userAuthentication.js";
import { registerGoogleUser } from "../controllers/googleUserController.js";
import { onlyAdminRoute } from "../middlewares/onlyAdminRoute.js";
import { userProtectedRoute } from "../middlewares/userProtectedRoute.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/register-google", registerGoogleUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", userProtectedRoute, userLogOut);
userRouter.get("/all-users", onlyAdminRoute, getAllusers);
userRouter.get("/getuser-byid/:id", userProtectedRoute, getUserById);
userRouter.delete("/delete/:id", onlyAdminRoute, deleteUser);
userRouter.get("/reactivate/:id", onlyAdminRoute, reActivateUser);
userRouter.put(
  "/update/:id",
  userProtectedRoute,
  upload.single("photoURL"),
  updateProfile
);

//secured route
userRouter.get("/authenticate", authenticateUser);

export default userRouter;
