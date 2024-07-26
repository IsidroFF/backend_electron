import { faker } from '@faker-js/faker';

// TODO: Crear el script para las pruebas de los datos

const TestUserId = "c06811a5-fc74-4955-bfdd-636c3c55b137"

// const userRandomName = faker.person.firstName();
// const userRandomMail = faker.internet.email();
// const userRandomPass = faker.lorem.word();
// const userRandomAdmin = faker.datatype.boolean();

// const res = await fetch("http://localhost:8080/register", {
//     method: "POST",
//     body: JSON.stringify({
//         name: userRandomName,
//         correo: userRandomMail,
//         password: userRandomPass,
//         admin: userRandomAdmin
//     }),
//     headers: {
//         "Content-Type": "application/json"
//     },
// });

// for (let i = 0; i < 10; i++) {
//     res;
//     console.log('Count:', i);
// }

async function createUsers() {
    for (let i = 0; i < 1000; i++) {
        const userRandomName = faker.person.firstName();
        const userRandomMail = faker.internet.email();
        const userRandomPass = faker.lorem.word();
        const userRandomAdmin = faker.datatype.boolean();

        const res = await fetch("http://localhost:8080/register", {
            method: "POST",
            body: JSON.stringify({
                name: userRandomName,
                correo: userRandomMail,
                password: userRandomPass,
                admin: userRandomAdmin
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await res.json(); // Assuming the server returns JSON
        console.log('Count:', i, 'Response:', data);
    }
}

async function createTask() {
    for (let i = 0; i < 25; i++) {
        const randomName = faker.lorem.word(); // Rowan Nikolaus
        const randomContent = faker.lorem.words();
        const randomDone = faker.datatype.boolean();
        const randomDeadline = faker.date.future();

        const res = await fetch("http://localhost:8080/api/v1/tasks", {
            method: "POST",
            body: JSON.stringify({
                name: randomName,
                content: randomContent,
                done: randomDone,
                deadline: randomDeadline,
                UserId: TestUserId
            }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await res.json(); // Assuming the server returns JSON
        console.log('Count:', i, 'Response:', data);
    }
}

createTask().catch(console.error);
//createUsers().catch(console.error);