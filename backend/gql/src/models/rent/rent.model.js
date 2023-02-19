import sequelize from "../../utils/db.js";
import { DataTypes } from "sequelize";
import Slot from "../slots/slot.model.js";
import Bike from "../bikes/bike.model.js";
import User from "../user/user.model.js";

const Rent = sequelize.define(
    "rent_rent",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        bike_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Bike,
                key: "id",
            },
        },
        start_slot_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Slot,
                key: "id",
            },
        },
        end_slot_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Slot,
                key: "id",
            },
            allowNull: true,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: "id",
            },
            allowNull: false,
        },
    },
    {
        timestamps: false,
        createdAt: false,
        freezeTableName: true,
    }
);

export default Rent;
