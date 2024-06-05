import mongoose from "mongoose";
const schema = mongoose.Schema;

// artist schema
const artistSchema = new schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    picture_url: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    born_date: {
      type: Date,
      required: true,
    },
    bord_city: {
      type: String,
      required: true,
    },
    died_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Artist = mongoose.model("Artist", artistSchema);

export { Artist };
