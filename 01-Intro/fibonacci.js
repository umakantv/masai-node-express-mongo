
const LIMIT = 2;

function fib(count) {
    
    let a = [0, 1];
    if (count < LIMIT) {
        return a.slice(0, count);
    }

    for (let i = 0; i < count; i++) {
        if (i > 1) {
            let num = a[i-1] + a[i-2];
            a.push(num);
        }
    }

    return a;
}

// export default fibonacci
module.exports = {
    fib,
};