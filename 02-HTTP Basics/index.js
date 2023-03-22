
const express = require('express');
const fs = require('fs');
const { fibonacci, fibonacciRecursive } = require('./fibonacci');

const app = express();

if (process.argv.length < 3) {

    console.log('Insufficient number of arguments, please pass a port number');
    process.exit()
}

// GET /
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/welcome.html', (req, res) => {

    fs.readFile('public/welcome.html', { // async
        encoding: 'utf-8'
    }, (err, data) => {
        if (err) {
            res.send('Error');
        }
        // as soon as the data is ready
        res.send(data);
    })

    // const welcomeFile = fs.readFileSync('public/welcome.html', {
    //     encoding: 'utf-8'
    // });

    // res.send(welcomeFile);
})

app.get('/fibonacci/:num', (req, res) => {

    const num = parseInt(req.params.num);

    let result = fibonacci(num);

    res.send(String(result));
})

app.get('/fibonacci-slow/:num', (req, res) => {

    const num = parseInt(req.params.num);

    let result = fibonacciRecursive(num);

    res.send(String(result));
})

const port = process.argv[2];

app.listen(parseInt(port), () => {
    console.log(`Server 1 listening on http://127.0.0.1:${port}`);
})

