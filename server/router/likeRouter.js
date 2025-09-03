import { Router } from "express";
import { doLike, likeCount } from "../controllers/likeController.js";
import { userProtectedRoute } from "../middlewares/userProtectedRoute.js";
const likeRouter = Router();

likeRouter.post("/add-remove-like", userProtectedRoute, doLike);
likeRouter.get("/like-count/:blogid", likeCount);

export default likeRouter;
