
// const fs = require('fs')

import fs from 'fs' // package.json -> type = module

if (process.argv.length < 3) {
    console.log('Insufficient number of arguments, please pass a filepath')
    process.exit()
}

let path = process.argv[2];

const content = fs.readFileSync(path, {
    encoding: 'utf-8'
})

console.log(content.length, 'characters')

fs.appendFileSync('./summary.txt', `${path} - ${content.length}\n`)