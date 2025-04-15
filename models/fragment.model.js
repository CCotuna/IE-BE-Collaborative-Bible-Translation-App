import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { Project } from "./project.model.js";

export const Fragment = sequelize.define(
  "Fragment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    verseNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Project.hasMany(Fragment, { foreignKey: 'projectId', as: 'fragments' });
Fragment.belongsTo(Project, { foreignKey: 'projectId' });
