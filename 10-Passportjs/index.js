
const express = require('express')
const session = require('express-session')
const connectDatabase = require('./db/connectDatabase')
const passport = require('passport')
const {Strategy: GithubStrategy} = require('passport-github2')
const {Strategy: LocalStrategy} = require('passport-local')
const User = require('./db/User.model')

const app = express()

app.use(express.json())
app.use(express.static('static'))

app.use(session({
    secret: '340j923n02nd-923d-23i9d',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
    }
}))

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})

app.use(passport.initialize());
app.use(passport.session());


passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        }, 
        async (email, password, done) => {

            console.log(email, password);

            let user = await User.findOne({
                email
            })

            if (!user) {
                return done(new Error('User does not exist'), false);
            }

            if (user.password !== password) {
                return done(new Error('User password does not match', false));
            }

            user = user.toJSON();
            delete user.password;

            return done(null, user);
        })
)

passport.use(
    new GithubStrategy(
            {
            clientID: '0cbca4f1f45ac3d6c3e8',
            clientPassword: '9d6e26c687b3d34f08f39f307a3a3a21255037b3',
            callbackURL: 'http://localhost:3000/github-signin',
            passReqToCallback: true,
        },
        async (accessToken, refreshToken, profile, done) => {

            if (!profile) {
                return done(new Error('Some internal error'), null);
            }

            let user = await User.findOne({
                githubUsername: profile.login,
                signinMethod: 'github'
            })

            if (!user) {
                user = await User.create({
                    githubUsername: profile.login,
                    signinMethod: 'github',
                    name: profile.name,
                    email: profile.email,
                    image: profile.avatar_url
                })
            }

            done(null, user);
        }
    )
)
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }))

app.get('/github-signin', passport.authenticate('github', {
    failureRedirect: '/login.html' // GET
}), function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/user');
})


app.post('/login', passport.authenticate('local', {
    successRedirect: '/user', // GET
    failureRedirect: '/login.html' // GET
}))

app.get('/user', (req, res) => {
    let user = req.session.passport?.user;

    return res.send(`Hello, ${user?.name || 'User'}`);
})

connectDatabase()
.then(() => {
    app.listen(3000, () => {
        console.log('http://localhost:3000')
    })
})

