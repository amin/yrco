import { z } from "zod";

const wordSchema = z.object({
  id: z.string(),
  word: z.string(),
  color: z.string(),
  icebreaker: z.string(),
});

export const publicProfileSchema = z.object({
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  picture: z.string(),
  username: z.string(),
  website: z.string().optional(),
  words: z.array(wordSchema),
});
