
const jwt = require('jsonwebtoken')

const SECRET = "WINTER_IS_COMING";

let token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImltYWdlIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS91c2VyL2FiYy91c2VyLnBuZyIsImlhdCI6MTUxNjIzOTAyMn0.1aBf6PA6SRo1OL51xS_MmUF0dp4QwsSG47pJu86HvKg";

//          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImltYWdlIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS91c2VyL2FiYy91c2VyLnBuZyIsImlhdCI6MTUxNjIzOTAyMn0.GbZE10pk4UP3drsvOA0lFWozXeTQyUc3RT-lZse7C8Y";
const payload = jwt.decode(token1);

// console.log(payload);

let token = jwt.sign({
    sub: '1234567890',
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: 'https://example.com/user/abc/user.png',
    iat: 1516239022
}, SECRET)

console.log(token)

jwt.verify(token, SECRET);


