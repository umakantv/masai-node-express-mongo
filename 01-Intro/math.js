const crypto = require('crypto'); // core module - available built-in

function fibonacci(n) {
    let a = [1, 1];

    for (let i = 2; i < n; i++) {
        a.push(a[i - 1] + a[i - 2]);
    }

    return a[n - 1];
}

// right is not inclusive
function randomNumber(left, right) {
    return crypto.randomInt(left, right);
    // return left + ((Math.floor(Math.random() * 10000000000)) % (right - left));
}

module.exports = {
    fibonacci,
    randomNumber
}