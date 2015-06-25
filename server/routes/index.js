var router = require('express').Router();
var path = require('path');

router.use('/projects', require('./projects'));
router.use('/folder', require('./folder'));
router.use('/user', require('./user'));

module.exports = router;
