import mongoose from "../lib/mongoose.js";

const traitSchema = new mongoose.Schema({
  trait: { type: String, required: true },
  color: { type: String, required: true },
  icebreaker: { type: String, required: true },
});

export default mongoose.model("Trait", traitSchema);
