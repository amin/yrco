import Session from "../models/Session.js";

export const create = async (token, uid, expiresAt) => {
  await Session.create({ token, uid, expiresAt });
};

export const findByToken = async (token) => {
  return Session.findOne({ token }).lean();
};

export const deleteByToken = async (token) => {
  await Session.deleteOne({ token });
};

export const deleteByUid = async (uid) => {
  await Session.deleteMany({ uid });
};
