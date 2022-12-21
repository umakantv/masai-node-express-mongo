
const express = require('express')
const session = require('express-session')

const app = express();

// Session Data is not persistent 

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "dummy_secret",
    cookie: {
        maxAge: 5 * 24 * 60 * 60 * 1000,
    }
}))

app.get('/', (req, res) => {

    req.session.visits = 0;
    res.send('Hello world')
})


app.post('/login', (req, res) => {

    req.session.loggedIn = true;

    req.session.user = {
        name: "ABC",
        email: "abc@example.com"
    };

    res.send('Logged in.')
})

app.get('/loggedInUser', (req, res) => {

    res.send(req.session.user)
})

app.get('/visits', (req, res) => {

    if (req.session.visits) {
        req.session.visits++;
    } else {
        req.session.visits = 1;
    }
    res.send(req.session.visits + ' Visits')
})


app.listen(3066, () => {
    console.log('Server listening at http://localhost:3066')
});