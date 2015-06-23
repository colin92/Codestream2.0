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

router.post('/', function(req, res, next) {
  
  Folder.create(req.body)
    .then(function(savedFolder) {
      res.status(201).send(savedFolder);
    });

});

router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var body = req.body;

  Folder.findOne({'_id': id}).exec()
    .then(function(foundFolder) {
      foundFolder.name = body.name;
      foundFolder._id = id;

      foundFolder.save(function(err) {
        if (err) return next(err);
        res.status(201).send(foundFolder);
      });

    });

});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;

  Folder.findOneAndRemove({'_id': id}).exec()
    .then(function(deletedFolder) {
      res.status(201).send(deletedFolder);
    })
    .then(null, next);
});
