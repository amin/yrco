import mongoose from "../lib/mongoose.js";
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String },
    website: { type: String },
    role: { type: String, enum: ["student", "organization"] },
    education: { type: String },
    organizationName: { type: String },
    roleAtCompany: { type: String },
    targetEducation: { type: [String], default: [] },
    setupComplete: { type: Boolean, default: false },
    traitIds: { type: [ObjectId], ref: "Trait", default: [] },
    connectionIds: { type: [String], default: [] },
    emailOptIn: { type: Boolean, default: null },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
