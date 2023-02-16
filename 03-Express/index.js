
const express = require('express');
const fs = require('fs')

const server = express();

server.use(express.json()); // Request will have json body

// Request method -> Path, Handler
// GET / -> Hello there
server.get('/', (req, res) => {
    res.send('Hello there');
});

server.post('/hello', (req, res) => {
    res.send('Hello user');
});

server.post('/hello/:name', (req, res) => {
    const name = req.params.name;

    const body = req.body;

    console.log('Body', body);

    // this is a comment without a comment
    res.send('Hello ' + name);
});

// Wildcard
server.get('/:filename', (req, res) => {
    const filename = req.params.filename;

    const query = req.query;

    console.log('Query', query)

    try {
        const content = fs.readFileSync(`./static/${filename}`, {
            encoding: 'utf-8'
        })

        res.send(content)

    } catch(err) {
        console.log(err.message)

        res.status(404).send('Something went wrong');
    }
})

server.listen(3000, () => {
    console.log('Server started at http://localhost:3000');
})