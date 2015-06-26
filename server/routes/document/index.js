//'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
require('../../db/models/document');

var Document = mongoose.model('Document');

module.exports = router;

router.get('/:id', function (req, res, next) {
  var id = req.params.id;

  Document.findById({'_id': id}).exec()
    .then(function(foundDocument) {
      res.send(foundDocument);
    })
    .then(null, next);

});

router.post('/', function(req, res, next) {
  
  Document.create(req.body)
    .then(function(savedDocument) {
      res.status(201).send(savedDocument);
    });

});

router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  var body = req.body;

  Document.findOne({'_id': id}).exec()
    .then(function(foundDocument) {
      foundDocument.name = body.name;
      foundDocument._id = id;

      foundDocument.save(function(err) {
        if (err) return next(err);
        res.status(201).send(foundDocument);
      });

    });

});

router.delete('/:id', function(req, res, next) {
  var id = req.params.id;

  Document.findOneAndRemove({'_id': id}).exec()
    .then(function(deletedDocument) {
      res.status(201).send(deletedDocument);
    })
    .then(null, next);
});
