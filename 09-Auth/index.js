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
const followerRouter = require('./routes/following.routes');
const likeRouter = require('./routes/like.routes');

const auth = require('./middlewares/auth');
const logger = require('./middlewares/logger');

const app = express();

// Standard Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(logger)

// Custom Middlewares
app.use(auth)

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);
app.use('/api/comment', commentRouter);
app.use('/api/follow', followerRouter);
app.use('/api/like', likeRouter);

app.get('/*', express.static('public'));

connectDatabase()
.then(() => {
    app.listen(3050, () => {
        console.log('Listening on http://localhost:3050')
    })
})