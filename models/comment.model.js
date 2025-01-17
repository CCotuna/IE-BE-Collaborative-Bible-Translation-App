import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Comment = sequelize.define(
  "Comment",
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
