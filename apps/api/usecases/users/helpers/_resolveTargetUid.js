import * as userRepo from "../../../repositories/userRepository.js";

export const resolveTargetUid = async (uid, username) => {
  const targetUid = await userRepo.findUidByUsername(username);
  if (!targetUid) throw { status: 404, message: "User not found" };
  if (targetUid === uid) throw { status: 400, message: "You cannot connect with yourself" };
  return targetUid;
};
