
const crypto = require('crypto')

function randomIntBetween(low, high) {
    return crypto.randomInt(low, high + 1);
}

// throw an error here
// throw new Error('Bad code here')

function fibonacciSlow(n) {

    if (n == 1) {
        return 1;
    } else if (n == 2) {
        return 1;
    } else {
        return fibonacci(n-1) + fibonacci(n-2);
    }
}

function fibonacci(n) {

    let arr = [1, 1];
    for (let i = 2; i < n; i++) {
        arr.push(arr[i-1] + arr[i-2]);
    }
    return arr[n-1];
}

console.log('Log from ./math/utils.js')


// Whatever you export
module.exports = {
    fibonacciSlow,
    fibonacci,
    randomIntBetween,
};

// module.exports = fibonacci;
// module.exports = fibonacciSlow;
