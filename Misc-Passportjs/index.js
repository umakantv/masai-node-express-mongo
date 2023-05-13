

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDatabase = require('./db/connectDatabase');
const session = require('express-session')
const passport = require('passport');
var cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local');
const { login } = require('./controllers/auth.controller');

const app = express()

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

passport.use(new LocalStrategy(login));

app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('static'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json()) // To read the req body as json
app.use(session({
    secret: 'j08ashjdf0n2304dfmn2wep0md29',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // that means client can't change this or delete this
        // supported only for https
        maxAge: 30 * 60 * 60 * 1000 // 30 minutes
    }
}))
app.use(passport.authenticate('session'));

app.post('/auth/login', (req, res, next) => {
    console.log(req.path, req.body)
    next();
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login.html'
}))

app.get('/', (req, res) => {
    res.send({
        message: 'Hello World'
    })
})

const port = 3001;
connectDatabase()
.then(() => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`)
    })
})