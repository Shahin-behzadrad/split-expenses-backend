import { Expense } from "../models/Expense.js";
import { formatResponse } from "../util/responseUtil.js";

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(
      formatResponse(
        200,
        "The requested data has been successfully retrieved.",
        expenses
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse(500, "Error retrieving data.", null, {}, [error.message])
      );
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (expense) {
      res.json(
        formatResponse(200, "Expense's data retrieved successfully.", expense)
      );
    } else {
      res.status(404).json(formatResponse(404, "Expense not found.", null));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse(500, "Error retrieving data.", null, {}, [error.message])
      );
  }
};

const createExpense = async (req, res) => {
  const { amount, name, payorUser, description } = req.body;

  try {
    if (!amount || !name || !payorUser || !description) {
      return res
        .status(400)
        .json(formatResponse(400, "Missing required fields."));
    }

    console.log(req.group);

    const expense = await req.group.createExpense({
      name: name,
      amount: amount,
      description: description,
      payorUser: payorUser,
    });

    return res
      .status(201)
      .json(formatResponse(201, "Expense successfully created.", expense));
  } catch (error) {
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
