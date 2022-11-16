

const jwt = require('jsonwebtoken');

// decode
// verify
// sign

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huZG9lQGVtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.oThXT5g6YKTUgmRUUidywdOeKIap0ebl_VGFdCWO1NU"
const decode = jwt.decode(token);
console.log(decode)

// Create a token
// So that we should be able to verify that the generated token
// was created by us

const SECRET_KEY = 'kjniuhd9h9234nk23jn'
const data = "Strings can be encrypted as well"

token = jwt.sign(data, SECRET_KEY);
console.log(token);
console.log(jwt.decode(token));

// jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.8osteDf9wcWEvGFvVsh1H0wpEs2NRV6Ci07JGMRe1gM", SECRET_KEY);
