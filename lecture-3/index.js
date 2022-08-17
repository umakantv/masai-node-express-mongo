
const http = require('http');

const fs = require('fs');

const server = http.createServer((req, res) => {
    // all the request will be handled here

    console.log(req.url);

    if (req.url === '/' && req.method == 'POST') {
        const data = fs.readFileSync('index.html')
        res.write(data);
    }
    else if (req.url === '/ping') {
        res.write(JSON.stringify({
            randomNumber: Math.random() * 1000,
            message: 'Pong'
        })); // idempotent
    } else {
        res.write('I don\'t understand this URL\n') // 404
    }

    res.end();

})

// 300 seconds

server.listen(4000, () => {
    console.log('Server 1 running on http://localhost:3000')
}) // 1000 - 65000