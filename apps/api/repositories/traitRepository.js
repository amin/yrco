import Trait from "../models/Trait.js";

export const findAll = async () => {
  const docs = await Trait.find().lean();
  return docs.map((doc) => ({
    id: doc._id.toString(),
    trait: doc.trait,
    color: doc.color,
    icebreaker: doc.icebreaker,
  }));
};
