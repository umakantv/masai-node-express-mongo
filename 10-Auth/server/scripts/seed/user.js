const { faker } = require('@faker-js/faker')
const connectDatabase = require('../../database')
const User = require('../../database/user')

async function createFakeUsers(count) {

    for (let i = 0; i < count; i++) {
        await User.create({
            name: faker.name.firstName() + ' ' + faker.name.lastName(),
            email: faker.internet.email(),
            image: faker.internet.avatar(),
            password: faker.internet.password()
        })

        console.log('User added')
    }
}

connectDatabase().then(() => {
    createFakeUsers(50);
})
