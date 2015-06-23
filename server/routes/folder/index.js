//'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models/folder');

var Folder = mongoose.model('Folder');

module.exports = router;

router.get('/:id', function (req, res, next) {
  var id = req.params.id;

  Folder.findById({'_id': id}).exec()
    .then(function(foundFolder) {
      res.send(foundFolder);
    })
    .then(null, next);

});

// router.post('/', function(req, res, next) {
  
//   Project.create(req.body)
//     .then(function(savedProject) {
//       res.status(201).send(savedProject);
//     });

// });

// router.put('/:id', function(req, res, next) {
//   var id = req.params.id;
//   var body = req.body;

//   Project.findOne({'_id': id}).exec()
//     .then(function(foundProject) {
//       foundProject.name = body.name;
//       foundProject._id = id;

//       foundProject.save(function(err) {
//         if (err) return next(err);
//         res.status(201).send(foundProject);
//       });

//     });

// });

// router.delete('/:id', function(req, res, next) {
//   var id = req.params.id;

//   Project.findOneAndRemove({'id': id}).exec()
//     .then(function() {
//       res.sendStatus(201);
//     })
//     .then(null, next);
// });
