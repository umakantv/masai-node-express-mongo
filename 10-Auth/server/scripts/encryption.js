
const jsonwebtoken = require('jsonwebtoken')

const SECRET = "KJuhidufnaskldhfblasif3" // keep it secret, and use this to sign/encode tokens
// encrypted tokens are designed in a way that anybody can decode and understand the encrypted message
// but they can't mimic anyo other message
const encrypted_token = jsonwebtoken.sign("Hey This is supposed to be encrypted", SECRET)

console.log(encrypted_token);


const decrypted_message = jsonwebtoken.decode(encrypted_token)

console.log(decrypted_message)
const tampered_token = "eyJhbGciOiJIUzI1NiJ9.SGV5IFRoaXMgaXMgYXNkZnNmIHN1cHBvc2VkIHRvIGJlIGVuY3J5cHRlZA.nYxNYWaEVEykYtB31a1yh-UwuOp0t3HBSHfvYBWIpWM";

console.log(jsonwebtoken.verify(encrypted_token, SECRET));