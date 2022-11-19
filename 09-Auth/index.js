require('dotenv').config({
    path: './.env'
})
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./database/connectDB');
const blogRouter = require('./routes/blog.routes');
const userRouter = require('./routes/user.routes');
const commentRouter = require('./routes/comment.routes');

const auth = require('./middlewares/auth');
const logger = require('./middlewares/logger');
const followerRouter = require('./routes/following.routes');

const app = express();

// Standard Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(logger)

// Custom Middlewares
app.use(auth)

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);
app.use('/follow', followerRouter);

app.get('/*', express.static('public'));

connectDatabase()
.then(() => {
    app.listen(3050, () => {
        console.log('Listening on http://localhost:3050')
    })
})