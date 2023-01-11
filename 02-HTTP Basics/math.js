const crypto = require('crypto'); // core module - available built-in

function fibonacci(n) {
    let a = [1, 1];

    for (let i = 2; i < n; i++) {
        a.push(a[i - 1] + a[i - 2]);
    }

    return a[n - 1];
}

function fibonacciSlow(n) {
    if (n < 3) return 1;

    return fibonacciSlow(n-1) + fibonacciSlow(n-2);
}

// right is not inclusive
function randomNumber(left, right) {
    return crypto.randomInt(left, right);
    // return left + ((Math.floor(Math.random() * 10000000000)) % (right - left));
}

module.exports = {
    fibonacci,
    randomNumber,
    fibonacciSlow,
}