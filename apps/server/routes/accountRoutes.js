import { Router } from "express";
import { getAccount, completeSetup, getWords, addConnection, removeConnection } from "../controllers/accountController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.get("/", getAccount);
router.get("/words", getWords);
router.post("/setup", completeSetup);
router.post("/connections", addConnection);
router.delete("/connections/:username", removeConnection);

export default router;
