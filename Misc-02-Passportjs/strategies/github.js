const passport = require('passport');
const { findUserByGithubId, users } = require('../users');
const GithubStrategy = require('passport-github2').Strategy;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.use(
    new GithubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        // need to add this GET endpoint to the server
        // you should check that your github oauth app must have the same callback ULR
        callbackURL: 'http://localhost:3000/auth/github/callback', 
        passReqToCallback: true,
      },
      // In the verify callback we will get an accessToken to make authenticated requests on the users behalf 
      // along with a refreshToken which is used in some authentication strategies to refresh an expired accessToken. 
      // We also are given an object called 'profile' which has data of the authenticated user
      function(req, accessToken, refreshToken, profile, done) {

        profile = profile._json;
        
        let user = findUserByGithubId(profile.login);

        if (!user) {
          user = {
            ...profile,
            githubId: profile.login,
            id: profile.login,
          }

          // req.session.user = user;
          users.push(user)
        }

        done(null, user);
      }
    )
);