import { Router } from "express";
import expenseController from "../controllers/expenseController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = Router();

router.get(
  "/groups/:groupId/expenses",
  authenticateToken,
  expenseController.getAllExpenses
);
router.get(
  "/groups/:groupId/expenses/:expenseId",
  authenticateToken,
  expenseController.getExpenseById
);
router.post(
  "/groups/:groupId/expenses",
  authenticateToken,
  expenseController.createExpense
);
router.patch(
  "/groups/:groupId/expenses/:expenseId",
  authenticateToken,
  expenseController.updateExpense
);
router.delete(
  "/groups/:groupId/expenses/:expenseId",
  authenticateToken,
  expenseController.deleteExpense
);

export default router;
