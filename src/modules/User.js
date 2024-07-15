import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Task } from './Task.js';

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Auto-generate UUIDs
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
    timestamps: true // Automatically adds createdAt and updatedAt
});

User.hasMany(Task, {
    foreignKey: 'UserId',
    sourceKey: 'id'
})

Task.belongsTo(User, {
    foreignKey: 'UserId',
    targetKey: 'id'
})