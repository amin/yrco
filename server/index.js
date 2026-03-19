import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const { db } = await import("./lib/firebase.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
import authRouter from "./routes/auth.js";
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ message: "Yingler API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
