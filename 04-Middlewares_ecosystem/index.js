
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const employeeRouter = require('./routes/employee.routes');

const app = express();

// middleware function
function logRequest(req, res, next) {
    next(); // pass the control to the next function (request handler)

    console.log(new Date(), req.method, req.url); // Log 1
}

let count = 0;
function countRequest(req, res, next) {
    count++;
    console.log('Request #', count); // Log 2
    next();
}

const rh1 = (req, res) => {
    // logRequest(req);
    res.send('Hello world')
}

const rh2 = (req, res) => {

    console.log('Inside Request Handler 2'); // Log 3
    // logRequest(req);
    res.send('Bye')
}

// Apply middleware functions
app.use(express.json()); // Middleware defined by express to convert req body into json object

// app.use(logRequest);
app.use(morgan('tiny'));
app.use(countRequest);
app.use(cors());



// How to serve static file with a middleware built-in express
// This will serve any file under static folder
// For example: /images/screenshot.png will send png file as response
// http://localhost:3000/ = http://localhost:3000/index.html
app.use(express.static('static'));

// Apply router
app.use('/employee', employeeRouter);

app.get('/', rh1);
app.get('/bye', rh2);


app.listen(3000);