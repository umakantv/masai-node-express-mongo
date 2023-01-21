
const jwt = require('jsonwebtoken');

// read the values from .env file and populate in process.env
require('dotenv').config({
    path: './.env'
})

// process object has env property
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

console.log(JWT_SECRET)

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiX2lkIjoiMjMyb2ppamtpbzM0bjIzajQzMjQiLCJuYW1lIjoiSmFuZSBEb2UiLCJpbWFnZSI6Imh0dHBzOi8vLnNkZGRzZHMiLCJpYXQiOjE1MTYyMzkwMjJ9.uQNSHWlRt38Qox86bvzPqe6Sko4q42rr7ujKcAvxd2A';
//           eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiX2lkIjoiMjMyb2ppamtpbzM0bjIzajQzMjQiLCJuYW1lIjoiSmFuZSBEb2UiLCJpbWFnZSI6Imh0dHBzOi8vLnNkZGRzZHMiLCJpYXQiOjE1MTYyMzkwMjJ9.aX4WuZkUi7IzHqd98XedoFLerJWHEfilddI_YuPXsBk
const result = jwt.decode(token)

// console.log(result);

try {

    jwt.verify(token, JWT_SECRET);

} catch(err) {
    console.error(err.message)
}

const newToken = jwt.sign({
    "sub": "1234567890",
    "_id": "232ojijkio34n23j4324",
    "name": "Umakant Vashishta",
    "image": "https://.sdddsds",
    "iat": 1516239022
}, JWT_SECRET)

console.log(newToken);


// jwt.verify
// jwt.sign()