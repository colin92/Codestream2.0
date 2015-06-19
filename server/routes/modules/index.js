//'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
//require('..//models/nodemodule');

module.exports = router;

router.get('/', function (req, res) {
  console.log("GET modules/");
  NodeModule
    .find()
    .exec()
    .then(function(nodeModules) {
      res.send(nodeModules);
    });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.send('hello world');
});
