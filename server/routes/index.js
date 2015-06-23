var router = require('express').Router();
var path = require('path');

router.use('/projects', require('./projects'));

module.exports = router;
