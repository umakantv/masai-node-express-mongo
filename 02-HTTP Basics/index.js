
import express from 'express'

const app = express()
const app2 = express()

function fib(n) {
    let numbers = [0, 1];

    for (let i = 2; i <= n; i++) {
        let num = numbers[i - 2] + numbers[i - 1];
        numbers.push(num);
    }

    return String(numbers[n]);
}

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/fib/:number', function (req, res) {
    const num = req.params.number;

    res.send(fib(Number(num)));
})

app2.get('/fib/:number', function (req, res) {
    const num = req.params.number;

    res.send(fib(Number(num)));
})

app.listen(3001)
app2.listen(3002)