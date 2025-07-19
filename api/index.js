import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "../config/mongodb.js";
import authRouter from "../routes/authRoutes.js";
import userRouter from "../routes/userRoutes.js";

// Setup Express
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Make sure this is defined in Vercel env
    credentials: true,
  })
);

// Routes
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => res.send("API Running on Vercel"));

export default serverless(app);
