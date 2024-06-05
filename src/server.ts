import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// database connection
const dbURI =
  "mongodb+srv://Bam29:idder1234@nodetuts.tkjwfon.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts";
//process.env.DB_URI
mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(3000, () => {
      console.log("sever is runing");
    })
  )
  .catch((err) => console.log(err));
