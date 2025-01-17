import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
