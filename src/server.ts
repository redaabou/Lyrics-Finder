import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// database connection
mongoose
  .connect(process.env.DB_URI)
  .then((result) =>
    app.listen(3000, () => {
      console.log("sever is runing");
    })
  )
  .catch((err) => console.log(err));
