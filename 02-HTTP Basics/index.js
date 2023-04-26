
const http = require('http')
const fs = require('fs');
const { fibonacci } = require('./fibonacci');

const server = http.createServer((req, res) => {
    // Request handler
    console.log('Request received');

    console.log(req.method, req.url);

    if (req.url == '/welcome.html') {
        res.write('<h1>Hello</h1>')
        res.write('Hello, this is the first chunk')
    } else if (req.url.includes('/files')) {
        let fileName = req.url.split('/').pop()

        if (fs.existsSync(`./files/${fileName}`)) {

            const fileContent = fs.readFileSync(`./files/${fileName}`)

            res.write(fileContent);
        } else {
            // send 404
            res.writeHead(404)
            res.write('File you are looking for does not exist.')
        }
    } else if (req.url.includes('/api/fibonacci')) {
        
        let num = req.url.split('/').pop()

        num = parseInt(num)

        if (isNaN(num)) {
            res.writeHead(400);
            res.write('Not a valid number')
        } else {
            res.write(String(fibonacci(num)))
        }
    }

    res.end();
})

server.listen(3002);

console.log('Server running at http://localhost:3002');