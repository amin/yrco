import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Yingler API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
