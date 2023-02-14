import sequelize from "../../utils/db.js";
import { DataTypes } from "sequelize";

const bike = sequelize.define("stations_bike", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 100
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 100,
        unique: true,
        editable: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 100
    }
},
    {
        timestamps: false,
        createdAt: false,
        freezeTableName: true,
    });

export default bike;