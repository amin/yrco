import Trait from "../models/Trait.js";

export async function handleGetTraits(_req, res) {
  const docs = await Trait.find().lean();
  res.json(docs.map((doc) => ({
    id: doc._id.toString(),
    trait: doc.trait,
    color: doc.color,
    icebreaker: doc.icebreaker,
  })));
}
