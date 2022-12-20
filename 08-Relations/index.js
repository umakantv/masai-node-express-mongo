

const express = require('express');
const cors = require('cors');
const connect = require('./db/connect');
const postRouter = require('./routes/post.routes');

const app = express();

app.use(cors()); // to allow response in browser from other host
app.use(express.json()); // to read req body as json data

app.use(express.static('build'));

app.use(postRouter);

// GET /hello
app.get('/hello', (req, res, next) => {
    res.send('Hello there')
})

const port = Number(process.argv[2]) || 3001;

connect()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    })
})
.catch((err) => {
    console.log('Can\'t start server due to failed db connection')
})