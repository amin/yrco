import * as userRepo from "../../repositories/userRepository.js";

export const getAccount = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  return user;
};
