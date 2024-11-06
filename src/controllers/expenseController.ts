import { Request, Response } from "express";
import { Expense } from "../models/Expense";

const getAllExpenses = async (req: Request, res: Response) => {
  const expenses = await Expense.findAll();
  res.json(expenses);
};

const getExpenseById = async (req: Request, res: Response) => {
  const expense = await Expense.findByPk(req.params.id);
  res.json(expense);
};

const createExpense = async (req: Request, res: Response) => {
  const expense = await Expense.create(req.body);
  res.status(201).json(expense);
};

const updateExpense = async (req: Request, res: Response) => {
  const [updated] = await Expense.update(req.body, {
    where: { id: req.params.id },
  });
  res.json({ updated });
};

export default { getAllExpenses, getExpenseById, createExpense, updateExpense };
