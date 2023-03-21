
// module
// exports
// require

const crypto = require('crypto'); // import core module

const { fibonacci, fibonacciRecursive } = require('./fibonacci') // User defined module

const { faker } = require('@faker-js/faker') // Third party library

if (process.argv.length < 3) {
    console.log('Insufficient number of arguments, please pass a name')
    process.exit()
}

let name = process.argv[2];

console.log('Hello there,', name)

console.log(crypto.randomInt(100, 30000))

console.log(fibonacci(300))
// console.log(fibonacciRecursive(43))

const USERS = [];

function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  USERS.push(createRandomUser());
});

console.log(USERS)