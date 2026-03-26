import { publicProfileSchema } from "@colyr/lib";

export const buildPublicProfile = (user, words) =>
  publicProfileSchema.parse({ ...user, words });

export const buildPublicProfiles = (users, allWords) => {
  const wordMap = Object.fromEntries(allWords.map((w) => [w.id, w]));
  return users.map((u) => {
    const words = (u.wordIds ?? []).map((id) => wordMap[id]).filter(Boolean);
    return buildPublicProfile(u, words);
  });
};
