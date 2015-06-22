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
      console.log(foundProject);
      foundProject.name = body.name;
      console.log(foundProject);
      foundProject.save(function(err) {
        if (err) next(err);
        console.log(foundProject);
        res.status(201).send(foundProject);
      });
    });
    // .then(function(savedProject) {
    //   //res.status(201).send(savedProject);
    //   next();
    // })
    //.then(null, next);

});
