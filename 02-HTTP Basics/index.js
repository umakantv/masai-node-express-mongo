
const http = require('http')
const fs = require('fs')
const fsPromises = require('fs/promises')
const { fibonacci, fibonacciSlow } = require('./math')

const server = http.createServer(async (req, res) => {
    // req: Request Object - useful properties and functions related to request
    // res: Response Object - 

    const path = req.url;
    const method = req.method;

    console.log(new Date(), method, path);

    if (path.includes('fibonacci-slow') && method === 'GET') {

        const n = parseInt(path.split('/').pop());

        return res.end(JSON.stringify({
            data: fibonacciSlow(n)
        }))

    } else if (path.includes('fibonacci') && method === 'GET') {
        const n = parseInt(path.split('/').pop());

        return res.end(JSON.stringify({
            data: fibonacci(n)
        }))
    } else if (path.includes('chunked') && method === 'GET') {

        res.write('First Chunk\n')
        res.write('Second Chunk\n')
        res.write('Third Chunk which is very huge\n')
        return res.end('Last Chunk')

    } else if (path.includes('file') && method === 'GET') {

        const fileName = path.split('/').pop();

        // const data = fs.readFileSync('./' + fileName);

        fs.readFile('./' + fileName, (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Unexpected error');
            }
            return res.end(data.toString());
        })

        try {
            const data = await fsPromises.readFile('./' + fileName)

            return res.end(data)
        } catch(err) {
            return res.end('Unexpexted error')
        }

    }


    // Write headers to the response
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // end the request with text data
    res.end(JSON.stringify({
        data: 'Hello World!',
    }));
})

server.listen(3030) // port 
console.log('Server is listening on http://localhost:3030')