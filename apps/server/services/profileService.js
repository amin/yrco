import { publicProfileSchema } from "@colyr/shared";

export const buildPublicProfile = (user, words) =>
  publicProfileSchema.parse({ ...user, words });
