
// const axios = require('axios');
const voucherCodeGenerator = require('voucher-code-generator');
const fs = require('fs'); // Core module
const {
    fibonacci,
    fibonacciSlow,
} = require('./math/utils');

const {
    randomIntBetween
} = require('./math/utils');

const voucherCodeGenerator2 = require('voucher-code-generator');
require('./math.js');


// setInterval
// setTimeout
// console.log('Later')
// console.log(document) // will throw an error
// console.log('Hello world');


let num = Number(process.argv[2])
let ans = fibonacci(num)

console.log(num, ans)

// const content = fs.readFileSync('./README.md')
// console.log(content.toString())


// fetch('https://jsonplaceholder.typicode.com/posts')
// .then(response => response.json())
// .then(console.log)

// axios.get('https://jsonplaceholder.typicode.com/users')
// .then(response => console.log(response.error))
// .catch(err => console.log(err))

// let vouchers = voucherCodeGenerator.generate({
//     length: 6,
//     count: 4,
//     charset: "0123456789"
// });

// console.log(vouchers)