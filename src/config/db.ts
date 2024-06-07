import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Ensure DB_URL is defined and is a string

if (!process.env.DB_URL) {
  throw new Error("Missing environment variable: DB_URL");
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
