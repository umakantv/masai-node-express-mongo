
import express from 'express';
import fsPromise from 'fs/promises';
import fs from 'fs';
import { fibonacci, fibonacciRecursive } from './fibonacci.js';

const app = express()

app.get('/welcome.html', (req, res) => {

    res.send(`<h1>Welcome</h1>
        <p>Hello, this is the final chunk</p>`)
})

// GET /files/home.html
// GET /files/globe.png
app.get('/files/:fileName', async (req, res) => {
    const fileName = req.params.fileName

    let filePath = `./files/${fileName}`

    let isTextFile = fileName.endsWith('.html') || 
        filePath.endsWith('.js')

    if (fs.existsSync(filePath)) {
        let content = await fsPromise.readFile(filePath, 
            isTextFile ? {
            encoding: 'utf-8'
        }: {});
        return res.send(content)
    } else {
        res.status(404).send('File does not exist')
    }
})

app.get('/api/fibonacci/:num', (req, res) => {
    let num = parseInt(req.params.num);

    if (isNaN(num)) {
        return res.status(400).send('Not a valid number')
    } else {
        return res.send(String(fibonacci(num)))
    }
})

app.get('/', (req, res) => {
    res.send({
        message: 'hello world of servers'
    })
})

app.listen(3002, () => {
    console.log('Server running at http://localhost:3002');
})