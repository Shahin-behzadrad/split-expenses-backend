import { Router } from "express";
import expenseController from "../controllers/expenseController.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const router = Router();

router.get(
  "/groups/:id/expenses",
  authenticateToken,
  expenseController.getAllExpenses
);
router.get(
  "/groups/:id/expenses/expenseId",
  authenticateToken,
  expenseController.getExpenseById
);
router.post(
  "/groups/:id/expenses",
  authenticateToken,
  expenseController.createExpense
);

export default router;
