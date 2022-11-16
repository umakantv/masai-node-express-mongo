
// Node comes with some built in modules
// helpful code

// explicitly want to use a feature
// Example: Read a text file

// os
// fs - file system

import { generateMultipleCodes, DEFAULT_CHARACTERS } from './code-generator.js';

// const voucherCode = require('voucher-code-generator'); 
import voucherCode from 'voucher-code-generator';
// require is a global function
// module is a module variable

// nodejs does not have import keyword

const codes = voucherCode.generate({
    length: 6,
    count: 10,
    charset: DEFAULT_CHARACTERS
});

console.log(codes)


// Import a module
// const fs = require('fs');
import fs from 'fs'

const fileName = process.argv[2];

console.log('Will read file', fileName);

const content = fs.readFileSync(fileName, {
    encoding: 'utf-8' // read content as string
});

let characters = DEFAULT_CHARACTERS + '*(&@!&*(&@';

console.log('Multiple referral codes:', generateMultipleCodes(characters, 4, 10));

// console.log(content);
