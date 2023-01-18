
const express = require('express');
const cors = require('cors');
const employeeRouter = require('./router/employee');
const connectDatabase = require('./database/connectDatabase');

const app = express();

app.use(express.json());
app.use(cors());

function logRequest(req, res, next) {
    next();
    console.log(new Date(), req.method, req.url); // 1
}

app.use(logRequest);

app.get('/hello', (req, res, next) => {

    res.send('Hello there')

    next();
})

app.use('/', employeeRouter);

app.use('/', express.static('static'));

const port = process.argv[2] || 3035;

connectDatabase()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening to http requests on http://localhost:${port}`)
    })
})