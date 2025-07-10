import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
const port = process.env.PORT || 4000;
const dbUri = process.env.MONGODB_ATLAS_URI;
import userRouter from "./router/userRouter.js";
import { connectDb } from "./configurations/serverNDBconnection.js";
import cookieParser from "cookie-parser";
import { blogRouter } from "./router/blogRouter.js";
import { categoryRouter } from "./router/categoryRouter.js";

//middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
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

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/categories", categoryRouter);

//connecting db and starting server
connectDb(dbUri, port, app);
