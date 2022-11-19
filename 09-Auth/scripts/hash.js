
const bcrypt = require('bcryptjs')

let password = 'password'

// encrypt it in such a way that it cannot be decrypted

let result = bcrypt.hashSync(password);

console.log(result)

password = 'InvalidPassword'
let match = bcrypt.compareSync(password, result)

console.log(match)
