import jwt from 'jsonwebtoken';
const JWT_SECRET_KEY = 'SOME_RANDOM_SECRET_KEY';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVhNjYyZDBhZTYzYTlhNzNiYWQ0NjkiLCJuYW1lIjoiVW1ha2FudCIsImVtYWlsIjoidW1ha2FudEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE2ODM2NDc3MjZ9.pyXPQXjC6sZ2bUPcNInDG0irWRbpPhhuZOFD9ob5g88"

const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDVhNjYyZDBhZTYzYTlhNzNiYWQ0NjkiLCJuYW1lIjoiVW1ha2FudCIsImVtYWlsIjoidW1ha2FudEBleGFtcGxlLmNvbSIsImlhdCI6MTY4MzY0NzcyNn0.KjPD2dz4ci4JMmDP86tShxun2WNTxCmMZPgBa3yZpOo"

// let data = jwt.decode(token2)

// token2 is not prepared by us, it's a fake

let data = jwt.verify(token, JWT_SECRET_KEY)
console.log(data)

