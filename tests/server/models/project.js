var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/project');

var Project = mongoose.model('Project');

describe('Project model', function () {
  beforeEach('Connect to db', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  it('should exist', function () {
      expect(Project).to.be.a('function');
  });

  describe('Project creation', function() {

    it('should create a project in the db', function(done){

      Project.create({})
        .then(function(data) {
          Project.findById(data).exec()
            .then(function(data) {
              expect(data).to.be.a('object');
              done();
            })
            .then(null, done);
        });
    });  
      
  });
});