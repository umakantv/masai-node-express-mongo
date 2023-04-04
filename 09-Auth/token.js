
const jwt = require('jsonwebtoken')


let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlVtYWthbnQgVmFzaGlzaHRhIiwiaWF0IjoxNTE2MjM5MDIyfQ.rRLGUTkvv08VbuwxFIADybRX-H2lnNUTi00DfcxHono"

let payload = jwt.decode(token)

console.log(payload)

// VERY IMPORTANT to keep this secret and PRIVATE
const JWT_SECRET_KEY = "jkhas8dhjq93rjq23094jd0q2349fj034"

// payload = jwt.verify(token, JWT_SECRET_KEY);

// console.log(payload)

let userPayload = {
    _id: "6427ed178fc26162d66fd955",
    name: 'Donnie Nienow',
    email: 'DonnieNienow_Larson25@gmail.com',
    image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/32.jpg',
    gender: 'male',
    dateOfBirth: "1950-09-01T05:11:34.175Z",
    createdAt: "2023-04-01T08:36:39.227Z",
    updatedAt: "2023-04-01T08:36:39.227Z",
}

token = jwt.sign(userPayload, JWT_SECRET_KEY)

console.log(token)