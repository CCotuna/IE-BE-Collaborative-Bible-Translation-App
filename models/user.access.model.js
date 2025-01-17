import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";

export const UserAccess = sequelize.define(
    "UserAccess",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);
