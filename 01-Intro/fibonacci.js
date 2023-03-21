
function fibonacci(n) {
    let nums = [1, 1];

    for (let i = 2; i < n; i++) {
        let num = nums[i - 2] + nums[i - 1];

        nums.push(num);
    }

    return nums[n-1];
}

function fibonacciRecursive(n) {
    if (n < 3) {
        return 1;
    }
    return fibonacciRecursive(n-1) + fibonacciRecursive(n-2);
}

module.exports = {
    fibonacci,
    fibonacciRecursive,
}