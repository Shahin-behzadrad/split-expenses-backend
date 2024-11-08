import { Sequelize } from "sequelize";

const sequelize = new Sequelize("split-expenses", "root", "Shahin_rad@2267", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
