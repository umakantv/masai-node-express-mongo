
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { fibonacci } from './fibonacci.js'
import authRouter from './router/auth.routes.js'

const app = express()

let count = 0;

const bodyParser = express.json()

// For each request we want to log the time, method and url
// app.use(logger)
app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     next()
// })
app.use(morgan('dev'))
app.use(countRequest)
// for each request we want to convert the req body as json data
app.use(bodyParser)

// GET /home.html -> this is going to return the file content 
// present inside public folder, and end the request
// GET /assets/images/globe.png
// GET / if you have index.html
app.use(express.static('public'))

app.get('/api/fibonacci/:num', inlineMiddleware, fibonacciHandler)
app.get('/', rootHandler)
app.use('/api/auth', authRouter)







function inlineMiddleware(req, res, next) {
    console.log('This is called an inline middleware');
    next()
}

function fibonacciHandler (req, res, next) {
    console.log('Inside the fib handler')
    // logger(req)
    let num = parseInt(req.params.num);

    if (isNaN(num)) {
        res.status(400).send('Not a valid number')
    } else {
        res.send(String(fibonacci(num)))
    }

    console.log('After the response is sent')

    next()
}

function rootHandler (req, res) {

    console.log('Inside the root handler')
    // logger(req)
    res.send({
        message: 'Hello'
    })
}

function countRequest(req, res, next) {
    count++;

    next()

    console.log('Request number: #', count);
}

function logger(req, res, next) {
    
    console.log(new Date(), req.method, req.url); // will this be printed?
    next()
}

app.listen(3002, () => {
    console.log('Server running on http://localhost:3002')
})