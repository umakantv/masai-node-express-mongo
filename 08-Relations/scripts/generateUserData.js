
const {faker} = require('@faker-js/faker')
const connect = require('../db/connect')
const { UserModel } = require('../db/user');

connect()
.then(async () => {
    const count = 100;

    const users = []

    for (let i = 0; i < count; i++) {
        const user = {
            name: faker.name.fullName(),
            image: faker.internet.avatar(),
            email: faker.internet.email()
        }

        users.push(user);
    }

    await UserModel.insertMany(users);
    console.log('Added users')
})