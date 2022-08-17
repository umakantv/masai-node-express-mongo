
// Modules in Nodejs

// User generated modules
const {
    fib
} = require('./fibonacci') // user generated module
const makeRecipe = require('./recipes');

// Core modules
const fs = require('fs'); // core module

// Third party modules
const moment = require('moment'); // it gives you lot of useful methods
const vcg = require('voucher-code-generator')
const axios = require('axios');

console.log(makeRecipe('coffee', 'cappuccino'));

// console.log(fib(3));




// const fs = require('fs'); // core module

const data = fs.readFileSync('index.html')
// console.log(data.toString())


console.log(moment().add(15, 'day'))

const vouchers = vcg.generate({
    charset: '1234567890',
    length: 6,
    count: 5
})

console.log(vouchers)


// axios.get('https://jsonplaceholder.typicode.com/posts')
// .then(response => console.log(response.data))

