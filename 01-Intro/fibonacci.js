
function fibonacci(n) {
    let fib = [0, 1]; // 0, 1, 1, 2, 3

    for (let i = 2; i < n; i++) {
        fib.push(fib[i - 2] + fib[i - 1]);
    }

    return fib[n-1];
}

function fibonacciSlow(n) {
    if (n == 1) {
        return 0;
    } else if (n == 2) {
        return 1;
    }
    return fibonacciSlow(n-1) + fibonacciSlow(n-2);
}


module.exports = {
    fibonacci,
    fibonacciSlow
};