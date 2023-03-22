
const http = require('http')
const fs = require('fs');
const { fibonacciRecursive } = require('./fibonacci');

const server = http.createServer((req, res) => {
    console.log('Request received', new Date(), req.method, req.url)

    if (req.url === '/welcome.html' && req.method === "GET") {
        const welcomeFile = fs.readFileSync('public/welcome.html', {
            encoding: 'utf-8'
        });

        res.write(welcomeFile);

        res.end();

        return;
    }

    if (req.url === '/chunked') {
        res.write('First chunk\n');
        res.write('Second chunk\n');

        // let n = fibonacciRecursive(44);
        res.write('Third chunk\n');
    }

    res.write('Hello there, user\n');

    res.end()
})

if (process.argv.length < 3) {
    console.log('Insufficient number of arguments, please pass a port number');
    process.exit()
}

const port = process.argv[2];
server.listen(Number(port));

console.log(`Server 1 listening on http://127.0.0.1:${port}`);
