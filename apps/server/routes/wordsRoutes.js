import { Router } from "express";
import { handleGetWords } from "../controllers/wordsController.js";

const router = Router();

router.get("/", handleGetWords);

export default router;
