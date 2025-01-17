import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const BibleBook = sequelize.define(
  "BibleBook",
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
