const passport = require("passport");
const { findUser } = require("../users");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      // Here we get email and password entered by user
      // it is upto us to find the user from storage 
      // and validate this request by checking password
      (email, password, done) => {
        const user = findUser(email);
  
        if (!user) { return done(null, false); }
        if (user.password !== password) { // should replace this with bcrypt.compareSync
          return done(null, false); 
        }
        return done(null, user);
      }
    )
);