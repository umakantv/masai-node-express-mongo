

const express = require('express');
const { fibonacciSlow, fibonacci } = require('./math/utils');

const app = express();

// GET /hello
app.get('/hello', (req, res, next) => {
    res.send('Hello there')
})

app.get('/fibonacci/:num', (req, res) => {
    let num = Number(req.params.num);

    if (isNaN(num)) {
        return res.end('Bad input');
    }
    const result = fibonacci(Number(num));

    res.send(String(result));
})

app.get('/fibonacci-slow/:num', (req, res) => {
    let num = Number(req.params.num);

    if (isNaN(num)) {
        return res.end('Bad input');
    }
    const result = fibonacciSlow(Number(num));

    res.send(String(result));
})


// GET /
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to Fibonacci API'
    })
})

// app.post()

const port = Number(process.argv[2]);

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})