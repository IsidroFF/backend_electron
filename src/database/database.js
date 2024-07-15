import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('taskdb','ikari','ikari',{
    host: 'localhost',
    dialect: 'postgres'
})