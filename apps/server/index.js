import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // allow Firebase Storage images
}));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.get("/", (_, res) => {
  res.json({ message: "Yingle API is running" });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
