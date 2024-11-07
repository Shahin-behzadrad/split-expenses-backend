import { Request, Response } from "express";
import { Expense } from "../models/Expense";
import { formatResponse } from "../util/responseUtil";

const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.findAll();
    res.json(
      formatResponse(
        200,
        "The requested data has been successfully retrieved.",
        expenses
      )
    );
  } catch (error: any) {
    res
      .status(500)
      .json(
        formatResponse(500, "Error retrieving data.", null, {}, [error.message])
      );
  }
};

const getExpenseById = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (expense) {
      res.json(
        formatResponse(200, "Expense's data retrieved successfully.", expense)
      );
    } else {
      res.status(404).json(formatResponse(404, "Expense not found.", null));
    }
  } catch (error: any) {
    res
      .status(500)
      .json(
        formatResponse(500, "Error retrieving data.", null, {}, [error.message])
      );
  }
};

const createExpense = async (req: Request, res: Response): Promise<any> => {
  const { amount, name, payorUser, description } = req.body;

  try {
    if (!amount || !name || !payorUser || !description) {
      return res
        .status(400)
        .json(formatResponse(400, "Missing required fields."));
    }

    // const expense = await req.group.createExpense({
    //   name: name,
    //   amount: amount,
    //   description: description,
    //   payorUser: payorUser,
    // });

    return res
      .status(201)
      .json(formatResponse(201, "Expense successfully created.", "expense"));
  } catch (error: any) {
    return res
      .status(500)
      .json(
        formatResponse(500, "Error creating expense.", null, {}, [
          error.message,
        ])
      );
  }
};

export default { getAllExpenses, getExpenseById, createExpense };
