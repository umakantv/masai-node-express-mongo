
// import crypto from 'crypto';
const crypto = require('crypto');
const os = require('os');
const fs = require('fs');
const { faker } = require('@faker-js/faker');
const axios = require('axios');

const { fibonacci, fibonacciSlow } = require('./fibonacci.js');

// console.log(os.cpus())

async function sampleGetRequest() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

    console.log(response.data)
}

sampleGetRequest()

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

console.log('Random User', createRandomUser());

console.log(fibonacci(1477));
// console.log(fibonacciSlow(45));

// console.log(crypto.randomInt(1000, 2000))

const readme = fs.readFileSync('./README.md', {
    encoding: 'utf-8'
})

// console.log(readme);

// process is a globally defined variable,
// similar to document for browser javascript
let name = process.argv[2];

// What are other gloabally defined variables

console.log('Hello', name)

let designation = process.argv[3];

if (!designation) {
    console.log('Designation is not provided')
    
} else {

    console.log(designation)
}
