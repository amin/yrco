import { publicProfileSchema } from "@colyr/lib";

export const buildPublicProfile = (user, traits) =>
  publicProfileSchema.parse({ ...user, traits });

export const buildPublicProfiles = (users) =>
  users.map((u) => buildPublicProfile(u, u.traitIds ?? []));
