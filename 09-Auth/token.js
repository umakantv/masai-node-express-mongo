
const jwt = require('jsonwebtoken');

require('dotenv').config({
    path: './.env.dev'
})

const JWT_SECRET = process.env.JWT_SECRET;

// It encrypts some info using a SECRET and produce a JSON Web Token
const token = jwt.sign({
    email: 'jane.doe@example.com',
    name: 'Jane Doe',
    _id: '234j92j3me2o3i4n23089end23'
}, JWT_SECRET)


// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImphbmUuZG9lQGV4YW1wbGUuY29tIiwibmFtZSI6IkphbmUgRG9lIiwiX2lkIjoiMjM0ajkyajNtZTJvM2k0bjIzMDg5ZW5kMjMiLCJpYXQiOjE2Njg2MTQxNDd9.B1GIweEIpMp-Bm1fV6xgXlMjwW73IAibsnFUXWYqVX0';
// console.log(token)
let result = jwt.verify(token, JWT_SECRET);
// const result = jwt.verify(token, 'asdfasdfasdf');
// const result = jwt.verify(token, 'asdfasdfasdf');

result = jwt.decode(token)
console.log(result)

const token2 = jwt.sign({
    email: 'kojfi234@example.com',
    name: 'sdkn234 dfjspdf',
    _id: '234j92j3me2o3i4n230dfsdfs23'
}, JWT_SECRET)

let result2 = jwt.decode(token2)
console.log(result2)
