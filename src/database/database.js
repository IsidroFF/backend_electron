import { Sequelize } from "sequelize"; // Modulo de Sequelize 
import 'dotenv/config' // Acceso a las variables de entorno

// Instancia de Sequelize para conectarse a la base de datos
export const sequelize = new Sequelize(
  process.env.DB_NAME, // Nombre de la base de datos
  process.env.DB_USER, // Usuario de acceso a la base de datos
  process.env.DB_PASS, { // Clave de acceso a la base de datos
  host: process.env.DB_HOST, // Direccion de la base de datos
  port: process.env.DB_PORT, // Puerto de la base de datos 
  dialect: 'postgres' // Tipo de comunicacion que utilizara Sequelize para la base de datos
})
