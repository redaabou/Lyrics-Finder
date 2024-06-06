// src/server.ts

import dotenv from "dotenv";
import app from "./app";
dotenv.config();

import connectDB from "./config/db";

// Connect to MongoDB
async function startServer() {
  try {
    await connectDB(); // Ensure the database connection is established before starting the server
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
  }
}

startServer();
