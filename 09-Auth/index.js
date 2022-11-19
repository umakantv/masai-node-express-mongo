require('dotenv').config({
    path: './.env'
})

const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./database/connectDB');
const blogRouter = require('./routes/blog.routes');
const userRouter = require('./routes/user.routes');
const commentRouter = require('./routes/comment.routes');

const auth = require('./middlewares/auth');
const logger = require('./middlewares/logger');

const app = express();

// Standard Middlewares
app.use(cors())
app.use(express.json())

// Custom Middlewares
app.use(logger)
app.use(auth)

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);

app.get('/*', express.static('public'));

connectDatabase()
.then(() => {
    app.listen(3050, () => {
        console.log('Listening on http://localhost:3050')
    })
})