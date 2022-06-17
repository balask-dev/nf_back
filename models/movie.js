import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String },
  titleImage: { type: String },
  imagesm: { type: String },
  trailer: { type: String },
  video: { type: String },
  year: { type: String },
  limit: { type: String },
  genre: { type: String },
  isSeries: { type: Boolean, default: false },
});

export default mongoose.model("Movie", MovieSchema);
