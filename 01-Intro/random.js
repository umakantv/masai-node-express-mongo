
// const fs = require('fs')
import fs from 'fs'
// import { getPosts } from './index.js';

// const crypto = require('crypto');
import crypto from 'crypto'

export function randomInt(start, end) {
    return crypto.randomInt(start, end);
}

console.log(crypto.randomUUID())

export function greeting(name) {
    
    let template = fs.readFileSync('./index.html', {
        encoding: 'utf-8'
    })

    template = template.replace('{{name}}', name)

    return template;
}


// getPosts()

// export randomInt;

// whatever we export will be available
// module.exports = {
//     randomInt,
//     greeting,
// };

// module.exports.hey = 'there'