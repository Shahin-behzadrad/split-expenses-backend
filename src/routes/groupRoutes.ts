import { Router } from "express";
import groupController from "../controllers/groupController";

const router = Router();

router.get("/", groupController.getAllGroups);
router.get("/:id", groupController.getGroupById);
router.post("/", groupController.createGroup);
router.patch("/:id", groupController.updateGroup);
router.delete("/:id", groupController.deleteGroup);

export default router;
