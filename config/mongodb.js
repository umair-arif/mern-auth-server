import mongoose from "mongoose";

const connectDB = async () => {
  const MONGODB_URL =
    "mongodb+srv://umairarif:DupgbVWx1CE5FfiU@umaircluster0.wjzfetl.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=UmairCluster0";
  mongoose.connection.on("connected", () => console.log("Database connected"));
  await mongoose.connect(MONGODB_URL);
};

export default connectDB;
