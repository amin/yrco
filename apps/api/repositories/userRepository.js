import User from "../models/User.js";

export const findById = async (uid) => {
  return User.findOne({ uid }).lean();
};

export const update = async (uid, data) => {
  return User.findOneAndUpdate({ uid }, { $set: data }, { returnDocument: "after" }).lean();
};

export const findByUsername = async (username) => {
  return User.findOne({ username }).lean();
};

export const claimUsername = async (username, uid) => {
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
  return User.find({ uid: { $in: uids } }).lean();
};

export const upsert = async (uid, data) => {
  await User.findOneAndUpdate(
    { uid },
    { $set: { uid, ...data } },
    { upsert: true },
  );
};

export const findAll = async (page, limit) => {
  return User.find()
    .sort({ createdAt: 1 })
    .skip((page - 1) * limit)
    .limit(limit + 1)
    .lean();
};

export const search = async (query, page, pageSize) => {
  const filter = {
    $or: [
      { username: { $regex: query, $options: "i" } },
      { firstName: { $regex: query, $options: "i" } },
      { lastName: { $regex: query, $options: "i" } },
      { organizationName: { $regex: query, $options: "i" } },
    ],
  };
  return User.find(filter)
    .sort({ createdAt: 1 })
    .skip((page - 1) * pageSize)
    .limit(pageSize + 1)
    .lean();
};
