import { Router } from "express";
import {
  handleGetAccount,
  handleCompleteSetup,
  handleGetWords,
  handleAddConnection,
  handleRemoveConnection,
  handleListConnections,
  handleUpdateProfile,
} from "../controllers/accountController.js";
import { requireAuth } from "../middleware/auth.js";
import { requireSetup } from "../middleware/requireSetup.js";

const router = Router();

router.use(requireAuth);
router.get("/", handleGetAccount);
router.post("/setup", handleCompleteSetup);
router.get("/words", requireSetup, handleGetWords);
router.get("/connections", requireSetup, handleListConnections);
router.post("/connections", requireSetup, handleAddConnection);
router.delete("/connections/:username", requireSetup, handleRemoveConnection);
router.patch("/", requireSetup, handleUpdateProfile);

export default router;
