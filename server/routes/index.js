var router = require('express').Router();
var path = require('path');

router.use('/projects', require('./projects'));
router.use('/folder', require('./folder'));

module.exports = router;
