
// modules - core module
const http = require('http');

function handleRequests(req, res) {
    console.log("Request arrived.")

    res.writeHead(400);

    res.end("Bad Request.");
}

const server = http.createServer(handleRequests)

server.listen(3000);
