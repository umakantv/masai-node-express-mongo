
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: '340j923n02nd-923d-23i9d',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
    }
}))

// this middleware will inject session object in the req object
// just like we injected req.user
// req.session

let visit = 0;

app.get('/', (req, res) => {
    
    let visit = 1;

    if (req.session.visit) {
        visit = req.session.visit;
        console.log(visit);
    } else {
        req.session.visit = visit;
    }
    req.session.visit++;

    res.send(`
        <h1>Hello ${req.session.user || 'User'}</h1>
        <p>Visit: ${visit}</p>`);
})


app.get('/login/:name', (req, res) => {

    const {name} = req.params;

    req.session.loggedIn = true;
    req.session.yourOwnProperty = {
        blocked: false
    };
    req.session.user = name;

    res.send(`Logged-in successfully`)
})

app.listen(3000, () => {
    console.log('http://localhost:3000')
})