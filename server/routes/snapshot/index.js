//'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models/snapshot');

var Snapshot = mongoose.model('Snapshot');

module.exports = router;

router.get('/:id', function (req, res, next) {
  var id = req.params.id;

  Snapshot.findById({'_id': id}).exec()
    .then(function(foundSnapshot) {
      res.send(foundSnapshot);
    })
    .then(null, next);

});

router.post('/', function(req, res, next) {
  
  Snapshot.create(req.body)
    .then(function(savedSnapshot) {
      res.status(201).send(savedSnapshot);
    });

});

router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var body = req.body;

  Snapshot.findOne({'_id': id}).exec()
    .then(function(foundSnapshot) {
      foundSnapshot.fileContent = body.fileContent;
      foundSnapshot._id = id;

      foundSnapshot.save(function(err) {
        if (err) return next(err);
        res.status(201).send(foundSnapshot);
      });

    });

});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;

  Snapshot.findOneAndRemove({'_id': id}).exec()
    .then(function(deletedSnapshot) {
      res.status(201).send(deletedSnapshot);
    })
    .then(null, next);
});
