import { publicProfileSchema } from "@colyr/lib";

export const buildPublicProfile = (user, words) =>
  publicProfileSchema.parse({ ...user, words });
