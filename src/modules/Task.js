import { DataTypes } from "sequelize"; // Tipos de datos que maneja sequelize
import { sequelize } from "../database/database.js"; // Instancia de sequelize para la coneccion con la base de datos

// Modelo de datos para las tareas
export const Task = sequelize.define('tasks',{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generar UUID's automaticamente
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true
    }
    },{
        // Marcas de tiempo para creacion y ultima actualizacion
        timestamps: true
})