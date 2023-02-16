import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

const DB_NAME = process.env.DB_NAME || 'CatBikes';
const DB_USER = process.env.DB_USER || 'admin';
const DB_PASS = process.env.DB_PASS || 'admin';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
});

export default sequelize;