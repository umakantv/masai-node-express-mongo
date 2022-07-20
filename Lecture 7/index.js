const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDatabase = require('./database/index');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const app = express()

app.use(express.json())
app.use(cors())         // Prevent error Cross-Origin-Resource-Sharing while using with react app
app.use(setReqContext);

app.use(logger);

app.use(userRouter);
app.use(postRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

function logger(req, res, next) {
    console.info(new Date(), req.method, req.path);

    next();
}

function setReqContext(req, res, next) {
    req.context = {
        // user will be present for authenticated routes
    }
    next();
}

connectDatabase().then(() => {
    app.listen(3001, () => {
        console.log("Server running at http://localhost:3001")
    })
})
