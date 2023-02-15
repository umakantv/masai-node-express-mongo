
const http = require('http');

const fs = require('fs');

const server = http.createServer((req, res) => {

    console.log('Request recieved.', req.url, req.method);
    if (req.url === '/welcome.html' && req.method === 'GET') {
        const file = fs.readFileSync('./index.html', {
            encoding: 'utf-8'
        });
        res.write(file);
    
        res.end();

    } else {
        res.write('WHOA');
    
        res.end();
    }


});

server.listen(3000);

console.log('Server listening for requests on http://localhost:3000');
