const crypto = require('crypto');
const {faker} = require('@faker-js/faker')
const connectDatabase = require("../db/connectDatabase");
const User = require("../db/user.model");

async function createUsers(count) {
    // User

    const users = [];

    for(let i = 0; i < count; i++) {

        let gender = crypto.randomInt(1, 11) <= 5 ? 'male': 'female';

        let name = faker.name.fullName({
            sex: gender
        })

        let email = faker.internet.email(name);

        users.push({
            name,
            email,
            password: faker.internet.password(),
            gender,
            dateOfBirth: faker.date.birthdate(),
            image: faker.internet.avatar(),
        })
    }

    await User.create(users);

    console.log('Users added.')
}

connectDatabase()
.then(() => {
    createUsers(500);
})