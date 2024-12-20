import sequelize from "../config/database.js";
import Group from "../models/Group.js";
import User from "../models/User.js";
import generateUuid from "../util/generateUuid.js";
import { formatResponse } from "../util/responseUtil.js";

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll({
      where: { userId: req.user.userId },
      attributes: [
        "id",
        "name",
        "currency",
        "users",
        "createdAt",
        "updatedAt",
        [
          sequelize.literal(
            `(SELECT COALESCE(SUM(amount), 0) FROM expenses WHERE expenses.groupId = group.id)`
          ),
          "totalExpense",
        ],
      ],
    });

    const formattedGroups = groups.map((group) => ({
      id: group.id,
      name: group.name,
      usersCount: group.users.length,
      totalExpense: group.getDataValue("totalExpense"),
      currency: group.currency,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
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

const getGroupById = async (req, res) => {
  try {
    const group = await Group.findOne({
      where: { id: req.params.groupId, userId: req.user.userId },
    });
    if (group) {
      const groupData = group.toJSON();
      delete groupData.userId;

      return res.json(
        formatResponse(200, "Group's data retrieved successfully.", groupData)
      );
    } else {
      return res
        .status(404)
        .json(formatResponse(404, "Group not found.", null));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse(500, "Error retrieving data.", null, {}, [error.message])
      );
  }
};

const createGroup = async (req, res) => {
  const { currency, description, name, users } = req.body;

  if (!Array.isArray(users)) {
    return res
      .status(400)
      .json(formatResponse(400, "Users should be an array."));
  }

  try {
    if (!currency || !name) {
      return res
        .status(400)
        .json(formatResponse(400, "Missing required fields."));
    }
    const user = await User.findByPk(req.user.userId);

    const usersWithIds = users.map((name) => ({
      id: generateUuid(),
      name,
    }));

    const group = await user.createGroup({
      name: name,
      description: description,
      currency: currency,
      users: usersWithIds,
    });

    return res.status(201).json(
      formatResponse(201, "Group successfully created.", {
        id: group.id,
        name: group.name,
        description: group.description,
        currency: group.currency,
        users: group.users,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        formatResponse(500, "Error creating group.", null, {}, [error.message])
      );
  }
};

const updateGroup = async (req, res) => {
  const { currency, description, name, users } = req.body;

  if (!Array.isArray(req.body.users)) {
    return res
      .status(400)
      .json(formatResponse(400, "Users should be an array."));
  }

  const usersWithIds = users.map((name) => ({
    id: generateUuid(),
    name,
  }));

  try {
    const group = await Group.findOne({
      where: { id: req.params.groupId, userId: req.user.userId },
    });

    if (!group) {
      return res
        .status(404)
        .json(formatResponse(404, "Group not found.", null));
    }

    const updatedGroup = await group.update({
      name: name,
      description: description,
      currency: currency,
      users: usersWithIds,
    });

    const groupData = updatedGroup.toJSON();
    delete groupData.userId;

    res.json(formatResponse(200, "Group successfully updated.", groupData));
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse(500, "Error updating group.", null, {}, [error.message])
      );
  }
};

const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findOne({
      where: { id: req.params.groupId, userId: req.user.userId },
    });

    if (group) {
      await group.destroy();
      res.json(formatResponse(202, "Group successfully deleted."));
    } else {
      res.status(404).json(formatResponse(404, "Group not found."));
    }
  } catch (error) {
    res
      .status(500)
      .json(
        formatResponse(500, "Error deleting group.", null, {}, [error.message])
      );
  }
};

export default {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
