import { Router } from "express";
import { handleGetAllTraits } from "../controllers/traitsController.js";

const router = Router();

router.get("/", handleGetAllTraits);

export default router;
