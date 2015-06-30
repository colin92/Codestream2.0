//'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models/users');

var User = mongoose.model('User');

module.exports = router;

// FIX: modify this or tests to work together, consider implementing a localstrategy just for tests
router.use('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  }
  else {
    res.sendStatus(401);
  }
});

// GET /api/user/login    
router.get('/login', function(req, res, next) {
  res.redirect('/auth/google');
});

// GET /api/user/logout
router.get('/logout', function(req, res, next) {
  res.logout();
  res.redirect('/');
});

// GET /api/user/:id
router.get('/:id', function(req, res, next) {
  if (req.user.id === req.params.id) {
    User.findOne({ _id: req.params.id }).exec()
    .then(function(user) {
      res.status(200).send(user);
    })
    .then(null, next);
  }
  else next();
});

// PUT /api/user/:id
router.put('/:id', function(req, res, next) {
  if (req.user.id === req.params.id) {  
    User.findById(req.params.id).exec()
    .then(function(user) {
      Object.keys(req.body).forEach(function(prop) {
        if(prop !== '_id') {
          user[prop] = req.body[prop];
        }
      });
      user.save(function(err) {
        if(err) return res.send(err);
        res.status(201).send(user);
      });
    })
    .then(null, next);
  }
  else next();
});

// DELETE /api/user/:id
router.delete('/:id', function(req, res, next) {
  if (req.user.id === req.params.id) {
    User.remove({ _id: req.params.id })
    .then(function(result) {
      req.logout();
      res.status(201).send(result);
    })
    .then(null, next);
  }
  else next();
});


// ADMINs only
router.use('/', function(req, res, next) {
  if(req.user.isAdmin()) {
    next();
  }
  else {
    res.sendStatus(401);
  }
});

// GET /api/user/
router.get('/', function(req, res, next) {
  User.find({}).exec()
  .then(function(users) {
    return res.status(200).send(users);
  })
  .then(null, next);
});

// POST /api/user/    
router.post('/', function(req, res, next) {
  // This route should not need to be used, users are created through Oauth login
  User.create(req.body)
  .then(function(user) {
    return res.status(201).send(user);
  })
  .then(null, next);
});

router.get('/:id', function(req, res, next) {
  User.findOne({ _id: req.params.id }).exec()
  .then(function(user) {
    return res.status(200).send(user);
  })
  .then(null, next);
});

// PUT /api/user/:id
router.put('/:id', function(req, res, next) {
  User.findById(req.params.id).exec()
  .then(function(user) {
    Object.keys(req.body).forEach(function(prop) {
      if(prop !== '_id') {
        user[prop] = req.body[prop];
      }
    });
    user.save(function(err) {
      if(err) return res.send(err);
      res.status(201).send(user);
    });
  })
  .then(null, next);
});

// DELETE /api/user/:id
router.delete('/:id', function(req, res, next) {
  User.remove({ _id: req.params.id })
    .then(function(result) {
      return res.status(201).send(result);
    })
    .then(null, next);
});