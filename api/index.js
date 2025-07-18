// api/index.js
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "../config/mongodb.js";
import authRouter from "../routes/authRoutes.js";
import userRouter from "../routes/userRoutes.js";

// Initialize
const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API running on Vercel");
});

// EXPORT for Vercel
export const handler = serverless(app);
