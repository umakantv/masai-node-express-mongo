

import http from 'http';
import fs from 'fs';

function fib(n) {
    let numbers = [0, 1];

    for (let i = 2; i <= n; i++) {
        let num = numbers[i - 2] + numbers[i - 1];
        numbers.push(num);
    }

    return String(numbers[n]);
}

function handler(req, res) {

    // GET /fib/45
    if (req.url.includes('/fib') && req.method === 'GET') {
        
        const num = req.url.split('/').pop()
        res.write(fib(Number(num)));

        return res.end();
    }
    else if (req.url.includes('/file-content')) {

        fs.readFile('./README.md', (err, data) => {
            res.write()
            res.end();
        })
    }
    else {
        
        res.write('Hey, here is a response for you');
        res.end();
    
    }



    console.log('Request received', req.url, req.method);

}

const server = http.createServer(handler);
const server2 = http.createServer(handler);

server.listen(3001)
server2.listen(3002)

console.log('Listening on http://localhost:3001');
