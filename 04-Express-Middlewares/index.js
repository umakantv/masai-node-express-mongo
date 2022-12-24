

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { router: employeeRouter } = require('./routes/employee.router');
const { router: userRouter } = require('./routes/user.router');
const path = require('path');

const app = express();

app.use(cors()); // to allow response in browser from other host
app.use(express.json()); // to read req body as json data

app.use(express.static('build')); // next is not called
app.use('/uploads', express.static('uploads')); // next is not called

let count = 0;
function countRequests() {
    count++;
    console.log('Request #', count); // log 1
}

app.use((req, res, next) => {

    countRequests();
    next();
})

app.use(morgan('dev'))

// app.use((req, res, next) => {
//     console.log(new Date(), req.method, req.path); // log 3
//     next();
// })

app.use('/', employeeRouter);
app.use('/', userRouter);

// GET /hello
app.get('/hello', (req, res, next) => {
    res.send('Hello there')
})

// GET /
app.get('/', (req, res) => {
    res.send({
        message: 'Welcome to Fibonacci API'
    })
})

app.all('/*', (req, res, next) => {
    const indexFile = path.join(__dirname, 'build', 'index.html');
    // console.log(indexFile);
    res.sendFile(indexFile);
})

const port = Number(process.argv[2]) || 3001;

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})