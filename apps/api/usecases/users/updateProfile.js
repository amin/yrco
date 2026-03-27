import * as userRepo from "../../repositories/userRepository.js";

export const updateProfile = async (uid, data) => {
  const user = await userRepo.update(uid, data);
  if (!user) throw { status: 404, message: "User not found" };
  return user;
};
