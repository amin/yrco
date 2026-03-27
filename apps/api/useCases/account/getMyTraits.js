import * as userRepo from "../../repositories/userRepository.js";
import * as traitsRepo from "../../repositories/traitRepository.js";

export const getMyTraits = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  return traitsRepo.findByIds(user.traitIds ?? []);
};
