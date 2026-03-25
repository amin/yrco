import { Router } from "express";
import {
  handleGetAccount,
  handleCompleteSetup,
  handleGetWords,
  handleAddConnection,
  handleRemoveConnection,
  handleListConnections,
} from "../controllers/accountController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.get("/", handleGetAccount);
router.get("/words", handleGetWords);
router.post("/setup", handleCompleteSetup);
router.get("/connections", handleListConnections);
router.post("/connections", handleAddConnection);
router.delete("/connections/:username", handleRemoveConnection);

export default router;
