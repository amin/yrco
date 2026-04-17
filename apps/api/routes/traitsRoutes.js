import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { handleGetAllTraits } from "../controllers/traitsController.js";

const router = Router();

router.get("/", requireAuth, handleGetAllTraits);

export default router;
