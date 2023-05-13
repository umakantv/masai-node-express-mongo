
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session')

const app = express()

app.use(session({
    secret: 'j08ashjdf0n2304dfmn2wep0md29',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // that means client can't change this or delete this
        // supported only for https
        maxAge: 30 * 60 * 1000 // 30 minutes
    }
}))
app.use(morgan('tiny'))
app.use(express.json()) // To read the req body as json
app.use(cors())

app.get('/', (req, res) => {

    console.log(req.session)
    res.send({
        message: 'Hello World'
    })
})

app.get('/login/:username', (req, res) => {

    const username = req.params.username;

    if (req.session.loggedInUser) {
        return res.status(400).send({
            message: 'User is already logged in'
        })
    } else {
        req.session.loggedInUser = {
            username,
        }
    }

    res.send({
        message: `Hello ${username}`
    })
})

app.get('/loggedInUser', (req, res) => {

    console.log(req.session)

    if (req.session.loggedInUser) {
        return res.send({
            data: req.session.loggedInUser
        })
    } else {
        res.status(400).send({
            message: `No user logged in`
        })   
    }
})

const port = 3001;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})