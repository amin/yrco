import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRouter from "./routes/authRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import traitsRouter from "./routes/traitsRoutes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { globalLimiter } from "./middleware/rateLimit.js";
import { connectDB } from "./lib/mongoose.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // allow cross-origin images
  }),
);
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Rate limiting
app.use(globalLimiter);

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/traits", traitsRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

try {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
}
