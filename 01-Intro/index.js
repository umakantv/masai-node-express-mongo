
// console.log('Hello world')

// console.log('Waiting...')

const { fibonacci, fibonacciRecursive } = require('./fibonacci')

function sum(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

// Browser related APIs are not available
// window
// document
// localStorage

// There are global variables that you may need while writing programs with nodejs
// process

// console.log(sum(10))


// setTimeout(() => {
//     console.log(process.cwd())
// }, 10*1000);

// process.on('exit', (code) => {
//     console.log(`About to exit with code: ${code}`);
// });
// process.on('exit', (code) => {
//     console.log(`About to exit with code: ${code}`);
// });
// console.log(process.argv)

let num = process.argv[2]

if (num) {
    num = parseInt(num)

    console.log(`Sum of first ${num} numbers: `, sum(num))
    console.log(`${num}-th fibonacci number: `, fibonacci(num))
} else {
    console.error('No number passed as argument')
    process.exit(1); // exit unsuccessfully
}

