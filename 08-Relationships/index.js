
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const postRouter = require('./routes/post.routes');
const connectDatabase = require('./db/connectDatabase');

const app = express()

app.use(morgan('tiny'))
app.use(express.json()) // To read the req body as json
app.use(cors())

app.use('/posts', postRouter);

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