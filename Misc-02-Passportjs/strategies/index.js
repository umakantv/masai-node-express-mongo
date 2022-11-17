
const passport = require("passport");
const { findUserById } = require("../users");

// same process as before:
passport.serializeUser((user, done) => {
  done(null, user);
});

// same process as before:
passport.deserializeUser((user, done) => {

  done(null, user);
});

require('./local') // to set the local strategy
require('./github') // to set the github strategy
