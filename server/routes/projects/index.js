//'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models/project');

var Project = mongoose.model('Project');

module.exports = router;

router.get('/', function (req, res) {

  Project.find().exec()
    .then(function(projects) {
      res.send(projects);
    });

});

router.get('/:id', function (req, res, next) {
  var id = req.params.id;

  Project.findById({'_id': id}).exec()
    .then(function(foundProject) {
      res.send(foundProject);
    })
    .then(null, next);

});

router.post('/', function(req, res, next) {
  
  Project.create(req.body)
    .then(function(savedProject) {
      res.status(201).send(savedProject);
    });

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
