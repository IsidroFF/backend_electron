import { DataTypes } from 'sequelize'; // Tipos de datos que maneja sequelize
import { sequelize } from '../database/database.js'; // Instancia de sequelize para la coneccion con la base de datos
import { Task } from './Task.js'; // Modelo de tareas

// Modelo para los datos de los usuarios
export const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generar UUID's automaticamente
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
}, {
    // Marcas de tiempo para creacion y ultima actualizacion
    timestamps: true 
});

// Crear llave foranea para el id del usuario dentro de la tabla de tareas
User.hasMany(Task, {
    foreignKey: 'UserId',
    sourceKey: 'id'
})

// Crear enlace de la llave foranea
Task.belongsTo(User, {
    foreignKey: 'UserId',
    targetKey: 'id'
})