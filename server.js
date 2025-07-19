import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowOrigins = ["https://mern-auth-client-iota.vercel.app"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowOrigins, credentials: true }));

// api end point hvu
app.get("/", (req, res) => {
  res.send("api working");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.listen(port, () => console.log(`Server started on port:${port}`));
