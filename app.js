import fs from "fs";
import express from "express";
import sequelize from "./config/database.js";
import helmet from "helmet";
import compression from "compression";

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

app.use(helmet());
app.use(compression());

User.hasMany(Group, { foreignKey: "userId", onDelete: "CASCADE" });
Group.belongsTo(User, { foreignKey: "userId" });

Group.hasMany(Expense, { foreignKey: "groupId", onDelete: "CASCADE" });
Expense.belongsTo(Group, { foreignKey: "groupId" });

sequelize
  .sync()
  .then(() => app.listen(process.env.MYSQLHOST || 3000))
  .catch((err) => {
    console.log("Error:", err.message);
    console.log(err.stack);
  });
