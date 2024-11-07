import express from "express";
import groupRoutes from "./routes/groupRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import { sequelize } from "./config/database.js";

import { Expense } from "./models/Expense.js";
import { Group } from "./models/Group.js";

const app = express();

app.use(express.json());

app.use("/api/groups", groupRoutes);
app.use("/api/expense", expenseRoutes);

Group.hasMany(Expense, { foreignKey: "groupId" });
Expense.belongsTo(Group, {
  foreignKey: "groupId",
  constraints: true,
  onDelete: "CASCADE",
});

sequelize
  .sync()
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
