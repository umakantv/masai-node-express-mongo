const jwt = require('jsonwebtoken');

const list = [
    'PASSWORD',
    'password',
    '1234556',
    'WINTER_IS_COMING',
];

let finalToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiX2lkIjoiMjMyb2ppamtpbzM0bjIzajQzMjQiLCJuYW1lIjoiVW1ha2FudCBWYXNoaXNodGEiLCJpbWFnZSI6Imh0dHBzOi8vLnNkZGRzZHMiLCJpYXQiOjE1MTYyMzkwMjJ9._MMCo25baNie-pMIcRKB8pqgDMICLb3MsG_1N4J-YF0'

const payload = {
    'sub': '1234567890',
    '_id': '232ojijkio34n23j4324',
    'name': 'Umakant Vashishta',
    'image': 'https://.sdddsds',
    'iat': 1516239022
}

for(const possibleSecret of list) {
    let token = jwt.sign(payload, possibleSecret);
    if (token == finalToken) {
        console.log('Secret Key identified', possibleSecret);
    }
}