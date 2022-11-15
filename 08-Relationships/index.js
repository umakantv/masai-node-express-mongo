
const express = require('express');
const { connectDatabase } = require('./database/connectDB');
const blogRouter = require('./routes/blog.routes');
const userRouter = require('./routes/user.routes');

const app = express();

function logger(req, res, next) {

    console.log(new Date(), req.method, req.url);  // Log 1

    // next is a function
    // next gives control to the next handler in pipeline
    next();
}

app.use(express.json());
app.use(logger);

// GET /user/asdf43423
// POST /user
app.use('/user', userRouter);

app.use('/blog', blogRouter);

app.get('/*', express.static('public'));

connectDatabase()
.then(() => {
    app.listen(3050, () => {
        console.log('Listening on http://localhost:3050')
    })
})