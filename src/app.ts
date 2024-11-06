import express from "express";
import groupRoutes from "./routes/groupRoutes";
import { sequelize } from "./config/database";

const app = express();
app.use(express.json());

app.use("api/groups", groupRoutes);

sequelize.sync().then(() => {
  app.listen(3000);
});
