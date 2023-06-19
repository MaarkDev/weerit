var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const User = require('./models/userModel')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://weerit-back.onrender.com/auth/google/callback" 
},

function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ uid: profile.id,
    mail: profile.emails[0].value,
    name: profile.displayName }, function (err, user) {
    return cb(err, user);
  });
}

));



passport.serializeUser((user, done) => {
  done(null, user); // tu davaj do user objectu napr { username: profile.displayName........ }
})

passport.deserializeUser((user, done) => {
  done(null, user);
})