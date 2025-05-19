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

//middlewares
app.use(cors());
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
app.get("/", (req, res) => {
  res.status(200).json({ msg: "welcome homepage" });
});
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

//connecting db and starting server
connectDb(dbUri, port, app);
