import Trait from "../models/Trait.js";

export const findAll = async () => {
  const docs = await Trait.find().lean();
  return docs.map((doc) => ({
    id: doc._id.toString(),
    trait: doc.trait,
    color: doc.color,
    colorText: doc.colorText,
    icebreaker: doc.icebreaker,
  }));
};

export const countByIds = async (ids) => {
  return Trait.countDocuments({ _id: { $in: ids } });
};
