import mongoose, { Document, Schema } from "mongoose";

interface ISong extends Document {
  genre: string;
  title: string;
  recorded_date: Date;
  lyrics: string;
  artist: mongoose.Types.ObjectId;
}

const SongSchema: Schema = new Schema(
  {
    genre: { type: String, required: true },
    title: { type: String, required: true },
    recorded_date: { type: Date },
    lyrics: { type: String, required: true },
    artist: { type: mongoose.Types.ObjectId, ref: "Artist", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISong>("Song", SongSchema);
