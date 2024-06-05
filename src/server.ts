import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// database connection
const dbURI = process.env.DB_URI;
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(3000, () => {
      console.log("sever is runing");
    })
  )
  .catch((err) => console.log(err));
