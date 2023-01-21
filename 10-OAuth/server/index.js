require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDatabase = require('./database/connectDatabase');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const app = express();

app.use(express.json());
app.use(cors());

function logRequest(req, res, next) {
    next();
    console.log(new Date(), req.method, req.url); // 1
}

app.use(logRequest);

app.get('/hello', (req, res, next) => {

    res.send('Hello there')

    next();
})

app.use('/auth', authRouter);
app.use('/post', postRouter);

app.use('/', express.static('static'));

const port = process.argv[2] || 3035;

connectDatabase()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening to http requests on http://localhost:${port}`)
    })
})