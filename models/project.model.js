import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";
import { UserAccess } from "./user.access.model.js";

export const Project = sequelize.define(
  "Project",
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
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hasUpdates: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      allowNull: true,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

User.belongsToMany(Project, {
  through: UserAccess,
  foreignKey: 'userId',
  otherKey: 'projectId',
  as: 'collaborators',
});

Project.belongsToMany(User, {
  through: UserAccess,
  foreignKey: 'projectId',
  otherKey: 'userId',
  as: 'collaborators'
});
