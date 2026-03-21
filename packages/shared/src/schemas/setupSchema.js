import { z } from "zod";

const wordIds = z.array(z.string()).length(5, "Pick exactly 5 words");

export const setupSchema = z.discriminatedUnion("role", [
  z.object({
    role: z.literal("student"),
    website: z.string().url({ error: "Must be a valid URL" }).or(z.literal("")).optional(),
    education: z.enum(["Web Developer", "Digital Designer"]),
    wordIds,
  }),
  z.object({
    role: z.literal("organization"),
    organizationName: z.string().min(1, "Organization name is required"),
    roleAtCompany: z.string().min(1, "Role is required"),
    wordIds,
  }),
]);
