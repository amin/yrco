import { Router } from "express";
import { getWords } from "../controllers/wordsController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requireAuth, getWords);

export default router;
