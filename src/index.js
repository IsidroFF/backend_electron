// Aplicacion de express
import app from './app.js';
// Instancia de sequelize
import { sequelize } from './database/database.js';
/// Acceso a las variables de entorno
import 'dotenv/config';

// Puerto de escucha del servidor
const port = process.env.PORT || 4000;

async function main(){
    try {
        // Verificamos conexion con la base de datos
        await sequelize.authenticate();

        // Sincronizamos los nuevos cambios en caso de que existan
        await sequelize.sync({alter: true});

        // Iniciamos la aplicacion en el puerto
        app.listen(port);
        console.log('Servidor en el puerto ',port);
    } catch (error){
        console.log('Error al conectarse con la base de datos \n',error);
    }
}

main();
