import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
