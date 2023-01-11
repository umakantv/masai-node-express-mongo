
// import { fibonacci } from "./math.js" // not default way

// default method to import things from other modules
const { fibonacci, randomNumber } = require('./math'); 
const crypto = require('crypto'); // core module
const fs = require('fs');
const fsPromise = require('fs/promises');

const { faker } = require('@faker-js/faker');


console.log(fibonacci(5)) // 1, 1, 2, 3, 5, 8, ...

console.log(randomNumber(45, 98))

console.log(crypto.randomUUID())

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

console.log(createRandomUser())

// console.log('Hello world.') // stdout - terminal (standard output)

// function logName(person) {
//     console.log(person)
// }

// console.log(process.argv); // what is process and where it is coming from

// if (process.argv.length < 4) {
    // process.exit(10); // os has to know whether the process has ended with error
    // 1 -> abnormal exit
    // 0 -> normal exit
    // process exited with exit code 0
// }

// logName({
//     name: process.argv[2],
//     designation: process.argv[3],
// })



// Global Defined literals

// setTimeout
// console
// Array
// Number
// Object

// nodejs gives us some global literals
// console.log(process) // -> hold the data related to this process
// module

// RAM (Memory - Temporary storage - available only as long as the process is running)
//  CPU, communicate with other process (reading content of a file)

// globally defined literals in browser
// window
// document.getElementById('user-login-modal')

