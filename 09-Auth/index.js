
require('dotenv').config();

console.log(process.env.JWT_SECRET);

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDatabase = require('./db/connectDatabase');
const postRouter = require('./routes/posts.routes');
const authRouter = require('./routes/auth.routes');

const app = express();

// Apply middleware functions
app.use(express.json()); // Middleware defined by express to convert req body into json object

// app.use(logRequest);
app.use(morgan('tiny'));
app.use(cors());

// Apply routers
app.use('/post', postRouter);
app.use('/auth', authRouter);

connectDatabase()
.then(() => {
    app.listen(3000, () => console.log('Server listening on http://localhost:3000'));
})