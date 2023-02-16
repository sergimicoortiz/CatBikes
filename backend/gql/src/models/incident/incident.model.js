import sequelize from "../../utils/db.js";
import { DataTypes } from "sequelize";
import User from "../user/user.model.js";
import Slot from "../slots/slot.model.js";

const Incident = sequelize.define("incidents_incident", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 300
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 100
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 100,
        editable: false,
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 100,
        defaultValue: "to_do"
    },
    slot_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Slot,
            key: "id",
        },
        allowNull: false,
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
    }
},
    {
        timestamps: false,
        createdAt: false,
        freezeTableName: true,
    }
);

export default Incident;

