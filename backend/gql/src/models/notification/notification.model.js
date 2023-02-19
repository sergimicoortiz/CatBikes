import sequelize from "../../utils/db.js";
import { DataTypes } from "sequelize";
import User from "../user/user.model.js";

const Notification = sequelize.define(
    "incidents_notification",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 300,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        modified_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        seen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        underscored: true,
        freezeTableName: true,
    }
);

export default Notification;
