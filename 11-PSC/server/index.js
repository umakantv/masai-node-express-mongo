require('dotenv').config()

const path = require('path');
const express = require('express');
const cors = require('cors');
const connect = require('./db/connect');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const commentRouter = require('./routes/comment.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static('build')); // next is not called

app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', commentRouter);

app.all('/*', (req, res, next) => {
    const indexFile = path.join(__dirname, 'build', 'index.html');
    res.sendFile(indexFile);
})

connect()
.then(() => {
    app.listen(3066, () => {
        console.log('Server listening at http://localhost:3066')
    });
})