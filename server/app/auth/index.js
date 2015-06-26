var config = process.env.NODE_ENV === 'development' ? 
  require('../../../config.js') : require('../../../config.test.js'); 
var router = require('express').Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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

// Local Strategy for passport (mostly for testing purposes)
passport.use('local', new LocalStrategy(function(username, password, done) {
  User.findOne({ firstName: username }, function(err, user) {
    if (err) { return done(err); }
    else if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    else if(user.correctPassword(password)) {
      done(null, user);
    }
    else {
      return done(null, false, { message: 'Invalid Password' });
    }
  });
}));

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

router.post('/auth/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err); 
    else if(!user) {
      req.session.messages = [info.message];
      return res.send('User not found');
    }
    else {
      return req.logIn(user, function(err) {
        if(err) return next(err); 
        else res.status(200).send('Authentication Successful!');
      });
    }
  })(req, res, next);
});

router.get('/auth/google', 
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' })
);

router.get('/auth/google/return', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  function(req, res) {
      console.log('console me');
      res.redirect('/');                              
});

module.exports = router;

