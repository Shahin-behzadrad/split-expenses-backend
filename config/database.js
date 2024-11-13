import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQLHOST,
  }
);

export default sequelize;
