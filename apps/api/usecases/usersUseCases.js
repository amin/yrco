import * as userRepo from "../repositories/userRepository.js";
import * as emailService from "../services/emailService.js";
import { publicProfileSchema } from "@yrco/lib";

export const getCurrentUser = async (uid) => {
  const user = await userRepo.findById(uid);
  if (!user) throw { status: 404, message: "User not found" };
  return user;
};

export const getPublicUser = async (username) => {
  const user = await userRepo.findByUsername(username);
  if (!user) throw { status: 404, message: "User not found" };
  return publicProfileSchema.parse({ ...user, traits: user.traitIds ?? [] });
};

export const getAllUsers = async (page, search, pageSize = 20) => {
  const candidates = search
    ? await userRepo.search(search, page, pageSize)
    : await userRepo.findAll(page, pageSize);
  const hasMore = candidates.length > pageSize;
  const slice = candidates.slice(0, pageSize);
  return { users: slice.map((u) => publicProfileSchema.parse({ ...u, traits: u.traitIds ?? [] })), hasMore };
};

export const updateUser = async (uid, data) => {
  const user = await userRepo.update(uid, data);
  if (!user) throw { status: 404, message: "User not found" };
  return user;
};

export const completeUserSetup = async (uid, data) => {
  const user = await userRepo.update(uid, { ...data, setupComplete: true });
  try {
    await emailService.sendWelcomeEmail({ to: user.email, firstName: user.firstName, traits: user.traitIds ?? [] });
  } catch (err) {
    console.error("Failed to send welcome email:", err);
  }
};
