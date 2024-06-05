import mongoose, { Document, Schema } from "mongoose";

interface IArtist extends Document {
  firstname: string;
  lastname: string;
  picture_url: string;
  genre: string;
  born_date: Date;
  born_city: string;
  died_date?: Date;
}

const ArtistSchema = new Schema<IArtist>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  picture_url: { type: String },
  genre: { type: String },
  born_date: { type: Date },
  born_city: { type: String },
  died_date: { type: Date },
});

export default mongoose.model<IArtist>("Artist", ArtistSchema);
