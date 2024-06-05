import mongoose from "mongoose";
const schema = mongoose.Schema

// chanson schema 
const chansonSchema = new schema(
    {
      genre: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      Recorded_date: {
        type: String,
        required: true,
      },
      lyrics: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  const Chanson = mongoose.model("Chanson", chansonSchema);
  
  export {Chanson}