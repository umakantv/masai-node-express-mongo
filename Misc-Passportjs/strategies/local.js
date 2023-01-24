const passport = require("passport");
const { findUser } = require("../users");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      // in the verify callback we will get an accessToken to make authenticated requests on the users behalf along with a refreshToken which is used in some authentication strategies to refresh an expired accessToken. We also are given an object called "profile" which has data on the authenticated user
      (email, password, done) => {
        const user = findUser(email);
  
        if (!user) { return done(null, false); }
        if (user.password !== password) { 
          return done(null, false); 
        }
        return done(null, user);
      }
    )
);