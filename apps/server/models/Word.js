import mongoose from "../lib/mongoose.js";

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  color: { type: String, required: true },
  icebreaker: { type: String, required: true },
});

export default mongoose.model("Word", wordSchema);
