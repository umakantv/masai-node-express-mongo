
// import axios from 'axios';

const crypto = require('crypto');
const os = require('os');
const dns = require('dns');
const fs = require('fs');

// console.log(os.cpus())

// dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
//   console.log(hostname, service);
  // Prints: localhost ssh
// });

console.log(crypto.randomInt(45, 999));

let content = fs.readFileSync('./README.md', {
    encoding: 'utf-8'
})

console.log(content);