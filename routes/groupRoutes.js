import { Router } from "express";
import groupController from "../controllers/groupController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/groups", authenticateToken, groupController.getAllGroups);
router.get("/groups/:id", authenticateToken, groupController.getGroupById);
router.post("/groups", authenticateToken, groupController.createGroup);
router.patch("/groups/:id", authenticateToken, groupController.updateGroup);
router.delete("/groups/:id", authenticateToken, groupController.deleteGroup);

export default router;
