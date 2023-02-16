import sequelize from "../../utils/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user_user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        editable: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 100,
        unique: true,
    },
    types: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 10,
        defaultValue: 'client'
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        max: 100,
        unique: true,
    }
},
    {
        timestamps: false,
        createdAt: false,
        freezeTableName: true,
    });


export default User;