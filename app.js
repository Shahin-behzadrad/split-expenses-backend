import express from "express";
import sequelize from "./config/database.js";

import Group from "./models/Group.js";
import Expense from "./models/Expense.js";
import User from "./models/User.js";

import groupRoutes from "./routes/groupRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", groupRoutes);
app.use("/api", expenseRoutes);
app.use("/api", userRoutes);

User.hasMany(Group, { foreignKey: "userId" });
Group.belongsTo(User, { foreignKey: "userId" });

Group.hasMany(Expense, { foreignKey: "groupId" });
Expense.belongsTo(Group, { foreignKey: "groupId" });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
