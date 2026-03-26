import Word from "../models/Word.js";

const toWord = (doc) => ({
  id: doc._id.toString(),
  word: doc.word,
  color: doc.color,
  icebreaker: doc.icebreaker,
});

export const findAll = async () => {
  const docs = await Word.find().lean();
  return docs.map(toWord);
};

export const findByIds = async (ids) => {
  if (ids.length === 0) return [];
  const docs = await Word.find({ _id: { $in: ids } }).lean();
  return docs.map(toWord);
};
