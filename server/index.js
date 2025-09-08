import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
const port = process.env.PORT || 4000;
const dbUri = process.env.MONGODB_ATLAS_URI;
import userRouter from "./router/userRouter.js";
import { connectDb } from "./configurations/serverNDBconnection.js";
import cookieParser from "cookie-parser";
import blogRouter from "./router/blogRouter.js";
import { categoryRouter } from "./router/categoryRouter.js";
import commentRouter from "./router/commentRouter.js";
import likeRouter from "./router/likeRouter.js";
import multer from "multer"; // ← IMPORT MULTER
import { handleError } from "./helper/errorHandler.js";

//middlewares
app.use(
  cors({
    // origin: "https://blogify-app-client.vercel.app", // Your frontend URL
    origin: `${process.env.URL_FRONTEND}`, // Your frontend URL
    credentials: true, // REQUIRED for cookies
  })
);
app.use(
  express.urlencoded({
    extended: true,
    inflate: true,
    limit: "10mb",
    parameterLimit: 5000,
    type: "application/x-www-form-urlencoded",
  })
);
app.use(express.json());
app.use(cookieParser());

//routes

// app.use("/api/file", fileRouter);
app.use("/api/user", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);

// -----------------for multer error----------------------------
// In your main server file, after routes
app.use((error, req, res, next) => {
  console.log("Multer error caught:", error); // ← Add logging for debugging
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large" });
    }
    return res.status(400).json({ error: error.message });
  }

  if (error.message === "Only image files are allowed") {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: "Upload failed" });
});
return next(handleError(erro.status, error.message || "unknown error"));
// --------------------------------------------------/---

//connecting db and starting server
connectDb(dbUri, port, app);

//error handling
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const msg = error.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    msg,
  });
});
