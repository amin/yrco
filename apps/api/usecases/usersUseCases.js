import * as userRepo from "../repositories/userRepository.js";
import * as traitRepo from "../repositories/traitRepository.js";
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

export const setEmailOptIn = async (uid, optIn) => {
  const user = await userRepo.update(uid, { emailOptIn: optIn });
  if (!user) throw { status: 404, message: "User not found" };
};

const toTitleCase = (str) => str.replace(/\b\w/g, (c) => c.toUpperCase());

export const completeUserSetup = async (uid, data) => {
  const validCount = await traitRepo.countByIds(data.traitIds);
  if (validCount !== 7) throw { status: 400, message: "Invalid trait selection" };

  const existing = await userRepo.findById(uid);
  const isFirstSetup = !existing?.setupComplete;

  const normalized = { ...data };
  if (normalized.organizationName) normalized.organizationName = toTitleCase(normalized.organizationName);
  if (normalized.roleAtCompany) normalized.roleAtCompany = toTitleCase(normalized.roleAtCompany);

  const user = await userRepo.update(uid, { ...normalized, setupComplete: true });

  // if (isFirstSetup) {
  //   try {
  //     await emailService.sendWelcomeEmail({ to: user.email, firstName: user.firstName, traits: user.traitIds ?? [] });
  //   } catch (err) {
  //     console.error("Failed to send welcome email:", err);
  //   }
  // }
};
