import mongoose from "../lib/mongoose.js";

const sessionSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  uid: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export default mongoose.model("Session", sessionSchema);
