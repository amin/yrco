import { z } from "zod";

const traitSchema = z.object({
  id: z.string(),
  trait: z.string(),
  color: z.string(),
  icebreaker: z.string(),
});

export const publicProfileSchema = z.object({
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  picture: z.string(),
  username: z.string(),
  website: z.union([z.url(), z.literal("")]).optional(),
  role: z.enum(["student", "organization"]),
  education: z.string().optional(),
  organizationName: z.string().optional(),
  roleAtCompany: z.string().optional(),
  traits: z.array(traitSchema),
});
