import app from './app.js';
import { sequelize } from './database/database.js';
import 'dotenv/config';

const port = process.env.PORT || 4000;

async function main(){
    try {
        await sequelize.sync({force: true});
        app.listen(port);
        console.log('Servidor en el puerto ',port);
    } catch (error){
        console.log('Unable to connect to the database ',error);
    }
}

main();
