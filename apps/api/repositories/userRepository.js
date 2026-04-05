import User from "../models/User.js";

export const findById = async (uid) => {
  const doc = await User.findOne({ uid }).populate("traitIds");
  return doc?.toObject({ virtuals: true }) ?? null;
};

export const update = async (uid, data) => {
  const doc = await User.findOneAndUpdate({ uid }, { $set: data }, { returnDocument: "after" }).populate("traitIds");
  return doc?.toObject({ virtuals: true }) ?? null;
};

export const findByUsername = async (username) => {
  const doc = await User.findOne({ username }).populate("traitIds");
  return doc?.toObject({ virtuals: true }) ?? null;
};

const RESERVED_USERNAMES = new Set(["me"]);

export const claimUsername = async (username, uid) => {
  if (RESERVED_USERNAMES.has(username)) return false;
  const existing = await User.findOne({ username }, { uid: 1 }).lean();
  if (!existing) return true;
  return existing.uid === uid;
};

export const findUidByUsername = async (username) => {
  const user = await User.findOne({ username }, { uid: 1 }).lean();
  return user?.uid ?? null;
};

export const addConnection = async (uid, targetUid) => {
  await User.updateOne({ uid }, { $addToSet: { connectionIds: targetUid } });
};

export const removeConnection = async (uid, targetUid) => {
  await User.updateOne({ uid }, { $pull: { connectionIds: targetUid } });
};

export const findByIds = async (uids) => {
  if (uids.length === 0) return [];
  const docs = await User.find({ uid: { $in: uids } }).populate("traitIds");
  return docs.map((d) => d.toObject({ virtuals: true }));
};

export const upsert = async (uid, data) => {
  await User.findOneAndUpdate(
    { uid },
    { $set: { uid, ...data } },
    { upsert: true },
  );
};

export const findAll = async (page, limit) => {
  const docs = await User.find({ setupComplete: true })
    .sort({ createdAt: 1 })
    .skip((page - 1) * limit)
    .limit(limit + 1)
    .populate("traitIds");
  return docs.map((d) => d.toObject({ virtuals: true }));
};

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const search = async (query, page, pageSize) => {
  const escaped = escapeRegex(query);
  const filter = {
    setupComplete: true,
    $or: [
      { username: { $regex: escaped, $options: "i" } },
      { firstName: { $regex: escaped, $options: "i" } },
      { lastName: { $regex: escaped, $options: "i" } },
      { organizationName: { $regex: escaped, $options: "i" } },
    ],
  };
  const docs = await User.find(filter)
    .sort({ createdAt: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize + 1)
    .populate("traitIds");
  return docs.map((d) => d.toObject({ virtuals: true }));
};
