
require('dotenv').config() // this will load your env secrets into process.env

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const postRouter = require('./routes/post.routes');
const connectDatabase = require('./db/connectDatabase');
const authRouter = require('./routes/auth.routes');
const commentRouter = require('./routes/comment.routes');
const userRouter = require('./routes/user.routes');

const app = express()

app.use(morgan('tiny'))
app.use(express.json()) // To read the req body as json
app.use(cors())

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World'
    })
})

const port = 3001;
connectDatabase()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`)
    })
})