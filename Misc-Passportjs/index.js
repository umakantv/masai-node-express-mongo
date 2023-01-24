require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');

require('./strategies/index')

app.use(express.json());
app.use(morgan('tiny'));

app.use(session({ 
  resave: true,
  saveUninitialized: true,
  secret: '<process.env.SECRET_KEY>'
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', { 
    successRedirect: '/home', // GET
    failureRedirect: '/login'
  })
);

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', // 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
});

app.get('/login', (req, res) => {
  res.send('Please log in')
})

app.get('/home', (req, res) => {

  let user = req.session?.passport?.user;
  res.send(`Hello, ${user?.name}`)
})

app.get('/', app.use(express.static('public')))

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
