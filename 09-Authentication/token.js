
const jwt = require('jsonwebtoken');

const JWT_SECRET = '345923j4m12p3mr-403kf-34mrp23n4rp3infp34f3';

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