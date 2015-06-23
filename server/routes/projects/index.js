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

  Project.findOneAndRemove({'id': id}).exec()
    .then(function() {
      res.sendStatus(201);
    })
    .then(null, next);
});
