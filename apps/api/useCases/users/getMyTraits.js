import * as userRepo from "../../repositories/userRepository.js";

export const getMyTraits = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  return user.traitIds ?? [];
};
