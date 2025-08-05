import { Router } from "express";
import { doLike, likeCount } from "../controllers/likeController.js";
const likeRouter = Router();

likeRouter.post("/add-remove-like", doLike);
likeRouter.get("/like-count/:blogid", likeCount);

export default likeRouter;
