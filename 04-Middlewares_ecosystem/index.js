
const express = require('express');
const cors = require('cors')
const employeeRoutes = require('./routes/employee.routes');
// const cors = require('./routes/middlewares/cors');
// const logger = require('./routes/middlewares/logger');

const morgan = require('morgan')

const app = express();

app.use(morgan('dev'))
// app.use(logger); // no matter the req METHOD or ENDPOINT
app.use(countRequests);
app.use(express.json()); // applying a middleware
app.use(cors());

/**
 * Any request for which the url is a file 
 * in the public folder, will be sent as static data
 * 
 * If url is / (root) -> index.html will be served
 */
app.use(express.static('public'))

app.get('/', helloWorld);
app.get('/hello/:user', helloUser);

app.use('/employees', employeeRoutes);


let count = 0;
function countRequests(req, res, next) {
    count++;
    console.log('Request #', count); // 2

    next();
}

function helloWorld(req, res, next) {

    console.log('Inside helloWorld') // 3
    res.send({
        data: 'Hello world'
    })

    next();
}

function helloUser(req, res) {

    console.log('Inside helloUser') // 4
    const user = req.params.user
    res.send('Hello, ' + user)
}

const port = 3001;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
