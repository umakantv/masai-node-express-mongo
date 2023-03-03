require('dotenv').config();
const { faker } = require('@faker-js/faker');
const connectDatabase = require('../db/connectDatabase');
const User = require('../db/User.model');

async function createFakeUsers(count = 100) {

    let users = [];

    for (let i = 0; i < count; i++) {
        const gender = Math.random() > 0.5 ? 'male' : 'female';
        const firstName = faker.name.firstName(gender);
        const lastName = faker.name.lastName();
        const user = {
            name: firstName + ' ' + lastName,
            gender,
            email: faker.internet.email(firstName, lastName),
            password: faker.internet.password(),
            image: faker.internet.avatar(),
            phone: faker.phone.number(),
            dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' })
        }

        users.push(user);
    }

    await User.create(users);

    console.log(count, 'Users added')
}

connectDatabase()
.then(() => createFakeUsers(100))