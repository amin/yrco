import Trait from "../models/Trait.js";

const toTrait = (doc) => ({
  id: doc._id.toString(),
  trait: doc.trait,
  color: doc.color,
  icebreaker: doc.icebreaker,
});

export const findAll = async () => {
  const docs = await Trait.find().lean();
  return docs.map(toTrait);
};

export const findByIds = async (ids) => {
  if (ids.length === 0) return [];
  const docs = await Trait.find({ _id: { $in: ids } }).lean();
  return docs.map(toTrait);
};
