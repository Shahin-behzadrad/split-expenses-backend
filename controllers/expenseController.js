import Expense from "../models/Expense.js";
import Group from "../models/Group.js";
import { formatResponse } from "../util/responseUtil.js";

const getAllExpenses = async (req, res) => {
  try {
    const group = await Group.findByPk(req.params.groupId, {
      include: Expense,
    });

    if (!group) return res.status(404).json({ message: "Group not found" });

    const formattedGroups = group.expenses.map((expense) => ({
      id: expense.id,
      name: expense.name,
      usersCount: expense.usersShare.length,
      totalExpense: expense.amount,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
    }));

    res.json(
      formatResponse(
        200,
        "The requested data has been successfully retrieved.",
        formattedGroups
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
    const expense = await Expense.findOne({
      where: { id: req.params.expenseId, GroupId: req.params.groupId },
    });
    if (!expense)
      return res
        .status(404)
        .json(formatResponse(404, "Expense not found.", null));

    expense.payorUser = await JSON.parse(expense.payorUser);

    res.json(
      formatResponse(200, "Expense's data retrieved successfully.", expense)
    );
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse(500, "Error retrieving data.", null, {}, [error.message])
      );
  }
};

const createExpense = async (req, res) => {
  const { amount, name, payorUserId, description, usersShare } = req.body;

  try {
    const group = await Group.findByPk(req.params.groupId);

    if (!group)
      return res.status(404).json(formatResponse(404, "Group not found."));

    if (!amount || !name || !payorUserId || !description || !usersShare) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "Missing required fields:[name,amount,payorUserId,description,usersShare] "
          )
        );
    }

    // extract users from group model to use here
    const groupUsers = group.users;

    const payor = groupUsers.find((user) => user.id === payorUserId);
    if (!payor) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            "The specified payorUser is not part of the group."
          )
        );
    }

    const formattedUsersShare = usersShare.map((userShare) => {
      const user = groupUsers.find((u) => u.id === userShare.id);

      if (!user) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              `User with ID ${userShare.id} is not part of the group.`
            )
          );
      }

      return {
        id: user.id,
        name: user.name,
        amountOwed: userShare.amount,
      };
    });

    const expense = await group.createExpense({
      name: name,
      description: description,
      payorUser: { name: payor.name, id: payor.id },
      amount: amount,
      usersShare: formattedUsersShare,
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

const updateExpense = async (req, res) => {
  const { name, description, amount, payorUser } = req.body;

  try {
    const expense = await Expense.findOne({
      where: { id: req.params.expenseId, GroupId: req.params.groupId },
    });
    if (!expense)
      return res.status(404).json(formatResponse(404, "Group not found."));

    const updatedExpense = await expense.update({
      name: name,
      description: description,
      amount: amount,
      payorUser: payorUser,
    });

    res.json(
      formatResponse(200, "Expense successfully updated.", updatedExpense)
    );
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse(500, "Error updating group.", null, {}, [error.message])
      );
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      where: { id: req.params.expenseId, GroupId: req.params.groupId },
    });

    if (expense) {
      await expense.destroy();
      res.json(formatResponse(202, "Expense successfully deleted."));
    } else {
      res.status(404).json(formatResponse(404, "Expense not found."));
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting expense", error: error.message });
  }
};

export default {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
