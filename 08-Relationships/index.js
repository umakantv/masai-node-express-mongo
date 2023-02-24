
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const postRouter = require('./routes/posts.routes');
const connectDatabase = require('./db/connectDatabase');

const app = express();

// Apply middleware functions
app.use(express.json()); // Middleware defined by express to convert req body into json object

// app.use(logRequest);
app.use(morgan('tiny'));
app.use(cors());

// Apply router
app.use('/post', postRouter);

connectDatabase()
.then(() => {
    app.listen(3000, () => console.log('Server listening on http://localhost:3000'));
})