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
  //console.log(id, body);

  Project.findOne({"_id": id}).exec()
    .then(function(foundProject) {
      foundProject = body;
      return foundProject.save().exec();
    })
    .then(function(savedProject) {
      res.status(201).send(savedProject);
      next();
    })
    .then(null, next);

});
