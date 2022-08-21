// Diagram - https://excalidraw.com/#json=aI-R7lsX-tACTCIn8f-SM,c8nbbk9DyGy4FDw5ubGtqw
const fs = require('fs');
const express = require('express')

const app = express();

app.get('/', (req, res) => {

    // const data = fs.readFileSync('index.html') // 20 seconds - 400 MB
    // res.write(data);
    // res.send();

    fs.readFile('index.html', (err, data) => { // action1
        data = data.toString()
        res.write(data);
        res.end()
    })
})

app.post('/', (req, res) => {
    const data = fs.readFileSync('index.js')
    res.write(data);
    res.send();
})

app.listen(4000, () => {
    console.log('Server listening on http://localhost:4000')
})