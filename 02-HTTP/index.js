
import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    // we will process req here

    const url = req.url;
    const method = req.method;

    console.log('Request received.', url, method);

    if (url === '/' && method == 'GET') {

        res.write('This is the response');

    } else if (url === '/hello' && method == 'GET') {

        res.write('Hey, what can I help you with?');

    } else if (url === '/bye' && method == 'GET') {

        res.write('Bye :(');

    } else {
        // read a file
        const content = fs.readFileSync('index.html', {
            encoding: 'utf-8'
        });
        res.write(content);
    }

    res.end();
});

const port = 3001;
server.listen(port);

console.log(`Server running at http://localhost:${port}`);
