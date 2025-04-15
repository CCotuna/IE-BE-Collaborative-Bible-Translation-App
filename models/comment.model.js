// models/comment.model.js
import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { Fragment } from "./fragment.model.js";
import { User } from "./user.model.js";

export const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fragmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Fragment.hasMany(Comment, { foreignKey: "fragmentId", as: 'comments' });
Comment.belongsTo(Fragment, { foreignKey: "fragmentId" });

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId" });