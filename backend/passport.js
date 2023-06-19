var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const User = require('./models/userModel')

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://weerit-back.onrender.com/auth/google/callback" 
},

function(accessToken, refreshToken, profile, cb) {
  //console.log(profile)
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
    .catch(err => {
      return cb(err);
    });
}
));



passport.serializeUser((user, done) => {
  //console.log("serializeUser:");
  //console.log(user); 
  done(null, user);
});

passport.deserializeUser((user, done) => {
  //console.log("deserializeUser:");
  //console.log(user); 
  done(null, user);
});
