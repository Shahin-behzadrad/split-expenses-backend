import { Group } from "../models/Group.js";
import generateUuid from "../util/generateUuid.js";
import { formatResponse } from "../util/responseUtil.js";

const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.findAll();
    res.json(
      formatResponse(
        200,
        "The requested data has been successfully retrieved.",
        groups
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
    const group = await Group.findByPk(req.params.id);
    if (group) {
      res.json(
        formatResponse(200, "Group's data retrieved successfully.", group)
      );
    } else {
      res.status(404).json(formatResponse(404, "Group not found.", null));
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

    const usersWithIds = users.map((name) => ({
      id: generateUuid(),
      name,
    }));

    const group = await Group.create({
      name,
      description,
      currency,
      users: usersWithIds,
    });
    return res
      .status(201)
      .json(formatResponse(201, "Group successfully created.", group));
  } catch (error) {
    return res
      .status(500)
      .json(
        formatResponse(500, "Error creating group.", null, {}, [error.message])
      );
  }
};

const updateGroup = async (req, res) => {
  if (!Array.isArray(req.body.users)) {
    return res
      .status(400)
      .json(formatResponse(400, "Users should be an array."));
  }

  try {
    const [updated] = await Group.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedGroup = await Group.findByPk(req.params.id);
      res.json(
        formatResponse(200, "Group successfully updated.", updatedGroup)
      );
    } else {
      res.status(404).json(formatResponse(404, "Group not found.", null));
    }
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
    const group = await Group.findByPk(req.params.id);

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
