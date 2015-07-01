//'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models/project');

var Project = mongoose.model('Project');

module.exports = router;

router.use('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  }
  else {
    res.sendStatus(401);
  }
});

router.post('/', function(req, res, next) {
  
  Project.create(req.body)
    .then(function(savedProject) {
      res.status(201).send(savedProject);
    });

});


// ADMINs or self only
router.use('/:id', function(req, res, next) {
  if(req.user.isAdmin() || req.user.id === req.params.id) {
    next();
  }
  else {
    res.sendStatus(401);
  }
});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;

  Project.findById({'_id': id}).exec()
    .then(function(foundProject) {
      return foundProject.getProject();
    })
    .then(function(populatedProject) {
      res.send(populatedProject);  
    })
    .then(null, next);

});

router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var body = req.body;

  Project.findOne({'_id': id}).exec()
    .then(function(foundProject) {
      foundProject.name = body.name;
      foundProject._id = id;

      foundProject.save(function(err) {
        if (err) return next(err);
        res.status(201).send(foundProject);
      });

    });

});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;

  Project.findOneAndRemove({'_id': id}).exec()
    .then(function(deletedProject) {
      res.status(201).send(deletedProject);
    })
    .then(null, next);
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

router.get('/', function (req, res) {
  Project.find().exec()
    .then(function(projects) {
      res.send(projects);
    });

});
