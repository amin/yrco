import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(1, "Username is required")
  .max(30, "Username must be 30 characters or less")
  .regex(/^[a-z0-9_]+$/, "Username may only contain lowercase letters, numbers, and underscores");
