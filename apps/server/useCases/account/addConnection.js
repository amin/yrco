import * as userRepo from "../../repositories/userRepository.js";
import { resolveTargetUid } from "./_resolveTargetUid.js";

export const addConnection = async (uid, username) => {
  const targetUid = await resolveTargetUid(uid, username);
  await userRepo.addConnection(uid, targetUid);
};
