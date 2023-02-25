
const jwt = require('jsonwebtoken')

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y5YzBlNDY3ZWViMjRmZmZkY2UyZGQiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.DegnBPv3Uw3llcr_JaL6i4l128tOy451j4izAHKi2Iw';

let SECRET = 'kjnas9r0324rdonq3l4jrn2-39jr23-r9j239rn09j-909j3-r49'

// Anybody can decode this payload without having the SECRET
// let payload = jwt.decode(token)

// Verify function will throw an error if SECRET is not the one with which the token was generated
// payload = jwt.verify(token, SECRET);

const data = {
    "_id": "63f9c0e467eeb24fffdce2dd",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "iat": 1516239022
}

const anotherToken = jwt.sign(data, SECRET)

console.log(anotherToken)

// console.log(payload);