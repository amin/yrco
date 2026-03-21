import { z } from "zod";

export const setupSchema = z.discriminatedUnion("role", [
  z.object({
    role: z.literal("student"),
    website: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
    education: z.enum(["Web Developer", "Digital Designer"]),
  }),
  z.object({
    role: z.literal("organization"),
    organizationName: z.string().min(1, "Organization name is required"),
    roleAtCompany: z.string().min(1, "Role is required"),
  }),
]);
