import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "split-expenses",
  "root",
  "Shahin_rad@2267",
  {
    dialect: "mysql",
    host: "localhost",
  }
);
