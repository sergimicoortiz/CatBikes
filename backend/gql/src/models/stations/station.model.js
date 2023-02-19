import sequelize from "../../utils/db.js";
import { DataTypes } from "sequelize";

const Station = sequelize.define(
    "stations_station",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 100,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 100,
            unique: true,
            editable: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 100,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            max: 100,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        createdAt: false,
        freezeTableName: true,
    }
);

export default Station;
