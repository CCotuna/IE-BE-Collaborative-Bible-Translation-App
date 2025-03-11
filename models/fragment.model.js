import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { BibleChapter } from "./bible.chapter.model.js";
import { Project } from "./project.model.js";

export const Fragment = sequelize.define(
  "Fragment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bibleChapterId: {
      type: DataTypes.INTEGER,
      references: {
        model: BibleChapter,
        key: 'id',
      },
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Project,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Fragment.belongsTo(BibleChapter, { foreignKey: "bibleChapterId" });
BibleChapter.hasMany(Fragment, { foreignKey: "bibleChapterId" });

Fragment.belongsTo(Project, { foreignKey: "projectId" });
Project.hasMany(Fragment, { foreignKey: "projectId" });
