import { Router } from "express";
import { handleGetTraits } from "../controllers/traitsController.js";

const router = Router();

router.get("/", handleGetTraits);

export default router;
