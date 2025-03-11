import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { Project } from "./project.model.js";

export const BibleBook = sequelize.define(
  "BibleBook",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: 'id',
      },
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

BibleBook.belongsTo(Project, { foreignKey: "projectId" });
Project.hasMany(BibleBook, { foreignKey: "projectId" });
