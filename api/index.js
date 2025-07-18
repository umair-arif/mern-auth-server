// api/index.js
import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "../config/mongodb.js";
import authRouter from "../routes/authRoutes.js";
import userRouter from "../routes/userRoutes.js";

// Initialize Express App
const app = express();
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://mern-auth-client-iota.vercel.app", // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API running on Vercel");
});

// ✅ Default export for Vercel
export default serverless(app);
