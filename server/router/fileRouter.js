import { Router } from "express";
import { uploadAvtar } from "../controllers/fileControllers.js";
import upload from "../configurations/multerConfiguration.js";

const fileRouter = Router();

fileRouter.post("/upload", upload, uploadAvtar);

export default fileRouter;
