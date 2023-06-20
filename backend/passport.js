const passport = require('passport');
const User = require('./models/userModel')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, cb) {
    User.findOne({ uid: profile.id })
    .then(existingUser => {
      if (existingUser) {
        return cb(null, existingUser);
      } else {
        const newUser = new User({
          uid: profile.id,
          mail: profile.emails[0].value,
          name: profile.displayName
        });
        return newUser.save();
      }
    })
    .then(savedUser => {
      if (savedUser) {
        return cb(null, savedUser);
      }
    })
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})