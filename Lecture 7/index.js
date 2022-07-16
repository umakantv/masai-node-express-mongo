const express = require('express');
const cors = require('cors');
const connectDatabase = require('./database/index');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const app = express()

app.use(express.json())
app.use(cors())         // Prevent error Cross-Origin-Resource-Sharing while using with react app

app.use(logger);

app.use(userRouter);
app.use(postRouter);

function logger(req, res, next) {
    console.info(new Date(), req.method, req.path);

    next();
}

connectDatabase().then(() => {
    app.listen(3001, () => {
        console.log("Server running at http://localhost:3001")
    })
})
