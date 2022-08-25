const express = require('express');
const { getLoggedInUser, login, register, verify } = require('./controllers/user');
const connectDatabase = require('./database');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

passport.use(new GoogleStrategy({
    clientID:       "329075112805-qaq4s71516p5b52vgo6smr2n1skb6178.apps.googleusercontent.com",
    clientSecret:   "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",
    callbackURL:    'https://www.example.com/oauth2/redirect/google'
  },
  function (issuer, profile, cb) {
    console.log(profile);
  })
);


const cors = require('cors')

app.use(cors());
app.use(express.json());

// Log each and every request
function logger(req, res, next) {
    // This should be called from inside any previous middlware
    console.log(new Date(), req.method, req.url); // req log
    next(); // once the next middlware is executed
    // then rest of this current middlware will be executed
}

app.use(logger);

app.get('/login/google', passport.authenticate('google'));
app.post('/register', register)
app.post('/login', login)
app.get('/loggedInUser', getLoggedInUser)
app.post('/verify', verify)

// sendVerifyEmail
// sendResetPasswordEmail
// resetPassword


const PORT = 3020;
connectDatabase().then(() => {
    app.listen(3020, () => {
        console.log(`Server started at http://localhost:${PORT}`)
    })
})
