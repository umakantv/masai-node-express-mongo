
const express = require('express')
const session = require('express-session')

const app = express();

app.set('trust proxy', 1) // trust first proxy

// Middleware - change req, res
/**
 * For each request, whether the session has been created or not
 * It will create a session if not already created
 * 
 * This will add `Set-Cookie`: `cookie-name:cookie-value` Header in the response
 */
app.use(session({
    secret: 'OIU@#()@J)@(JS_@(JS',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))


app.get('/', (req, res) => {

    // req.session.visit = 10;
    let visit = 1;
    if (req.session.visit) {
        req.session.visit++;
        visit = req.session.visit;
    } else {
        req.session.visit = 1;
    }

    res.send(`Hello there, you have visited ` + visit + ' times');
})

app.get('/login/:username', (req, res) => {
    req.session.loggedInUser = req.params.username;

    res.send(req.session.loggedInUser);
})

app.get('/loggedInUser', (req, res) => {

    res.send('User: ' + req.session.loggedInUser);
})

app.listen(4000, () => {
    console.log('Server listening on http://localhost:4000')
})