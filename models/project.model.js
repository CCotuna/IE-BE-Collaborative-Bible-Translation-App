import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    creationDate: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
