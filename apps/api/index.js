import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import authRouter from "./routes/authRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import usersRouter from "./routes/usersRoutes.js";
import traitsRouter from "./routes/traitsRoutes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { globalLimiter } from "./middleware/rateLimit.js";

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
app.use("/account", accountRouter);
app.use("/users", usersRouter);
app.use("/traits", traitsRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
