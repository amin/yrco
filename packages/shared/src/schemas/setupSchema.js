import { z } from "zod";

export const setupSchema = z.object({
  role: z.enum(["student", "organization"]),
});
