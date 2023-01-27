require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const connectDatabase = require('./database/connectDatabase');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.get('/hello', (req, res, next) => {

    res.send('Hello there')

    next();
})

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);

app.use('/', express.static('static'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'));
})

const port = process.argv[2] || 3035;

connectDatabase()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening to http requests on http://localhost:${port}`)
    })
})