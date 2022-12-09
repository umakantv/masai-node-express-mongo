
// Core module
const http = require('http');
const fs = require('fs');
const fsPromise = require('fs/promises');
const { fibonacciSlow, fibonacci } = require('./math/utils');

const server = http.createServer(async (req, res) => {

    // fs.readFileSync()
    // fs.readFile('', (err, data) => {

    // })

    if (req.url.includes('fibonacci-slow')) {
        let num = req.url.split('/').pop();
        if (isNaN(num)) {
            return res.end('Bad input');
        }
        const result = fibonacciSlow(Number(num));

        return res.end(String(result));
    } else if (req.url.includes('fibonacci')) {
        let num = req.url.split('/').pop();
        if (isNaN(num)) {
            return res.end('Bad input');
        }
        const result = fibonacci(Number(num));

        return res.end(String(result));
    } else if (req.url === '/read-file') {

        fsPromise.readFile('./README.md', {
            encoding: 'utf-8'
        }).then(result => {
            return res.end(result)
        });

        // fs.readFile('./README.md', (err, data) => {
        //     if (err) {
        //         return res.end('Something went wrong');
        //     } else {
        //         res.write(data.toString());
        //     }
        //     return res.end();
        // })

    } else {
        return res.end('Welcome to fibonacci API. Send your requests to /fibonacci or /finbonacci-slow')
    }

    // res.write(`<h1>Hey</h1>`)
    // res.end(`<h2>Heading 2</h2>`)
})

const port = Number(process.argv[2]);

const server2 = http.createServer((req, res) => {
    return res.end('YESS')
})

server2.listen(port + 4);

server.listen(port);

console.log(`Server listening on http://localhost:${port}`);
console.log(`Server 2 listening on http://localhost:${port + 4}`);
