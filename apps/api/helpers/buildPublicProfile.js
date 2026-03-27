import { publicProfileSchema } from "@colyr/lib";

export const buildPublicProfile = (user, traits) =>
  publicProfileSchema.parse({ ...user, traits });

export const buildPublicProfiles = (users, allTraits) => {
  const traitMap = Object.fromEntries(allTraits.map((t) => [t.id, t]));
  return users.map((u) => {
    const traits = (u.traitIds ?? []).map((id) => traitMap[id]).filter(Boolean);
    return buildPublicProfile(u, traits);
  });
};
