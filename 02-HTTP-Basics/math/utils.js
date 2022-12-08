
const crypto = require('crypto')

function randomIntBetween(low, high) {
    return crypto.randomInt(low, high + 1);
}

function fibonacciSlow(n) {

    if (n == 1) {
        return 1;
    } else if (n == 2) {
        return 1;
    } else {
        return fibonacciSlow(n-1) + fibonacciSlow(n-2);
    }
}

function fibonacci(n) {

    let arr = [1, 1];
    for (let i = 2; i < n; i++) {
        arr.push(arr[i-1] + arr[i-2]);
    }
    return arr[n-1];
}


module.exports = {
    fibonacciSlow,
    fibonacci,
};
