import sequelize from "../../utils/db.js";
import { DataTypes } from "sequelize";
import Station from "../stations/station.model.js";
import Bike from "../bikes/bike.model.js";

const Slot = sequelize.define("stations_slot", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 100
    },
    station_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Station,
            key: "id",
        },
        allowNull: false,
    },
    bike_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Bike,
            key: "id",
        },
        allowNull: true,
    }
},
    {
        timestamps: false,
        createdAt: false,
        freezeTableName: true,
    }
);

export default Slot;