import { faker } from '@faker-js/faker';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config'

// TODO: Crear el script para las pruebas de los datos
const randomName = faker.lorem.word(); // Rowan Nikolaus
const randomContent = faker.lorem.text();
const randomDone = faker.datatype.boolean();
const randomDeadline = faker.date.future();
const TestUserId = "ac460fd7-ed87-4fd3-b207-9b90af2c6a66"

//console.log('{\n\"name\": ',randomName,',\n','}');

