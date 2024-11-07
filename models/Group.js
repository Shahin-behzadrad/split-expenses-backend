import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Group = sequelize.define("group", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  users: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});
