
const express = require('express')
const fs = require('fs/promises')

const app = express()

app.use(express.text()) // allow only text format for request body
// app.use(express.json()) // allow only json format for request body

const port = process.argv[2] || 3035;

// different request handler for each type of endpoint

// GET /
app.get('/', (req, res) => {

    return res.send({
        message: 'Hello World'
    })
})

// GET /file/{fileName}
// /file/index.html -> fileName = index.html
// /file/README.md -> fileName = README.md
app.get('/file/:fileName', async (req, res) => {
    try {
        const data = await fs.readFile(`./static/${req.params.fileName}`);
    
        res.send(data.toString());
    } catch(err) {
        console.error(err.message)

        const data = await fs.readFile(`./static/404.html`, {
            encoding: 'utf-8'
        });

        return res.status(404).send(data)
    }
})

app.post('/file/:fileName', async (req, res) => {
    try {
        const fileName = req.params.fileName;

        const encoding = req.query.encoding || 'utf-8';

        const text = req.body;

        console.log(text)

        fs.writeFile(`./static/${fileName}`, text, {
            encoding
        })

        const contentType = req.headers['content-type'] || 'text/plain';

        if (contentType === 'application/json') {
            return res.send({
                message: 'Done!'
            })
        }

        return res.send('Done!')
    } catch(err) {
        return res.send('Unexpected Error')
    }
})

app.listen(port, () => {
    console.log(`Server listening to http requests on http://localhost:${port}`)
})