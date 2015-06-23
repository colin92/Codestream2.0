var config = process.env.NODE_ENV === 'development' ? 
  require('../../../config.js') : require('../../../config.test.js'); 
var router = require('express').Router();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var mongoose = require('mongoose');
require('../../db/models/users.js');

var User = mongoose.model('User');

router.use(passport.initialize());
router.use(passport.session());

// serialize/deserialize users in requests
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Initialize google oauth2 strategy through passport
passport.use(new GoogleStrategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ 'google.id': profile.id }, function (err, user) {
        if (err) return done(err);
        if (user) {
            done(null, user);
        } else {
            User.create({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                google: {
                    id: profile.id
                }
            }).then(function (user) {
                done(null, user);
            }, function (err) {
                console.error(err, profile);
                done(err);
            });
        }
    });
  }  
));


// auth routes
router.get('/login', function(req, res) {
  res.send('failed!');
});

router.get('/google', 
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' })
);

router.get('/google/return', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  function(req, res) {
      console.log('console me');
      res.redirect('/');                              
});

module.exports = router;

