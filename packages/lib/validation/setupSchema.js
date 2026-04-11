import { z } from "zod";

export const traitIdsSchema = z.array(z.string()).length(7, "Pick exactly 7 traits");
const traitIds = traitIdsSchema;

export const studentFieldsSchema = z.object({
  education: z.enum(["Web Developer", "Digital Designer"], { error: "Select your education" }),
  website: z.union([z.url("Must be a valid URL (include https://)").max(200, "URL is too long"), z.literal("")]).optional(),
  website2: z.union([z.url("Must be a valid URL (include https://)").max(200, "URL is too long"), z.literal("")]).optional(),
});

export const organizationFieldsSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required").max(50, "Organization name is too long"),
  roleAtCompany: z.string().min(1, "Role is required").max(50, "Role is too long"),
  targetEducation: z.array(z.enum(["Web Developer", "Digital Designer"])).min(1, "Select at least one programme"),
});

export const setupSchema = z.discriminatedUnion("role", [
  studentFieldsSchema.extend({ role: z.literal("student"), traitIds }),
  organizationFieldsSchema.extend({ role: z.literal("organization"), traitIds }),
]);
