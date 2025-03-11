import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";
import { BibleBook } from "./bible.book.model.js";

export const BibleChapter = sequelize.define(
  "BibleChapter",
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
    bibleBookId: {
      type: DataTypes.INTEGER,
      references: {
        model: BibleBook,
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

BibleChapter.belongsTo(BibleBook, { foreignKey: "bibleBookId" });
BibleBook.hasMany(BibleChapter, { foreignKey: "bibleBookId" });
