import { Router } from "express";
import { getWords } from "../controllers/wordsController.js";

const router = Router();

router.get("/", getWords);

export default router;
