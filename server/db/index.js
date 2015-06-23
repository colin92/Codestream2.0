var Promise = require('bluebird');
var chalk = require('chalk');
var config = process.env.NODE_ENV === 'development' ? 
  require('../../../config.js') : require('../../../config.test.js'); 


var DATABASE_URI = "mongodb://localhost:27017/" + config.dbName;

var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI).connection;

// Require your models in here
require('./models/users');
require('./models/project');
require('./models/folder');
require('./models/document');
require('./models/snapshot');

var startDbPromise = new Promise(function (resolve, reject) {
    db.on('open', resolve);
    db.on('error', reject);
});


console.log('Starting MongoDB...');

startDbPromise.then(function () {
    console.log(chalk.green('MongoDB connection opened! dbName:'), chalk.magenta(dbName));
});


module.exports = startDbPromise;
