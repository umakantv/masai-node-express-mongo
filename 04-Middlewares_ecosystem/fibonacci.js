

export function fibonacci(n) {
    let nums = [1, 1];

    for (let i = 2; i <=n; i++) {
        nums.push(nums[i-2] + nums[i-1]);
    }

    return nums[n-1]
}

export function fibonacciRecursive(n) {

    if (n < 3) {
        return 1;
    }

    return fibonacciRecursive(n-1) + fibonacciRecursive(n-2);
}