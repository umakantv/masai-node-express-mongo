

let name = process.argv[2];
let profile = process.argv[3];
let age = process.argv[4];

age = parseInt(age); // parseInt is also a global function
// console is also a globally defined object

// import user defined modules
// const { generateCode } = require('./code-generator.js');

import { generateCode } from './code-generator';


// console.warn
// console.info

if (isNaN(age)) {
    console.error('Age is not a number'); // Standard error output
    process.exit(1) // abnormal exit
}

function sayHello(name, profile, age) {
    console.log("Hello", name); // Standard output
    console.log("You are a", profile);
    console.log("You are", age, 'years old');

    console.log('Your referral code is', generateCode(undefined, 10));
}

sayHello(name, profile, age);
