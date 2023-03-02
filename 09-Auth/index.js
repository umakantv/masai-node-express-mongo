
require('dotenv').config();

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDatabase = require('./db/connectDatabase');
const authRouter = require('./routes/auth.routes');
const postRouter = require('./routes/posts.routes');
const commentRouter = require('./routes/comment.routes');

const app = express();

// Apply middleware functions
app.use(express.json()); // Middleware defined by express to convert req body into json object

app.use(express.static('static'));
// app.use(logRequest);
app.use(morgan('tiny'));
app.use(cors());

// Apply routers
app.use('/api/post', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/comment', commentRouter);

connectDatabase()
.then(() => {
    app.listen(3001, () => console.log('Server listening on http://localhost:3001'));
})