import * as userRepo from "../../repositories/userRepository.js";
import { resolveTargetUid } from "./helpers/_resolveTargetUid.js";

export const removeConnection = async (uid, username) => {
  const targetUid = await resolveTargetUid(uid, username);
  await userRepo.removeConnection(uid, targetUid);
};
