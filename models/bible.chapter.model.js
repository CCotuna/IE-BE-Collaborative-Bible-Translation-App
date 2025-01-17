import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const BibleChapter = sequelize.define(
  "BibleChapter",
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
