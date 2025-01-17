import { Sequelize } from "sequelize";

const db = {
  NAME: "BackendApp",
  USERNAME: "BackendApp",
  PASSWORD: "BackendApp",

  options: {
    dialect: "mysql",
    timezone: "+00:00",
    host: "mysql.BackendApp",
    port: 3306,
    logging: function (str) {
      console.log(str);
    },
  },
};

export const sequelize = new Sequelize(
  db.NAME,
  db.USERNAME,
  db.PASSWORD,
  db.options
);