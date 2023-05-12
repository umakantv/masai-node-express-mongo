import connectDatabase from "../db/connectDatabase.js";
import { faker } from '@faker-js/faker'
import crypto from 'crypto'
import UserModel from "../db/User.model.js";

async function addFakeUsers(count) {

    const users = [];

    for (let i = 0; i < count; i++) {
        const gender = crypto.randomInt(1, 101) < 51 ? 'male' : 'female';
        const firstName = faker.name.firstName({ sex: gender })
        const lastName = faker.name.firstName({ sex: gender })
        const user = {
            name: faker.name.fullName({ firstName, lastName }),
            gender,
            email: faker.internet.email(firstName, lastName),
            password: faker.internet.password(),
            image: faker.internet.avatar(),
        }

        users.push(user);
    }

    await UserModel.create(users);

    console.log('Added users');

}

connectDatabase()
.then(() => addFakeUsers(1000));