var dbURI = require('../../../config.js').test.dbURI;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/project');

var Project = mongoose.model('Project');

describe('Project model', function () {

  before(function(done) {
    mongoose.connect(dbURI, done);
  });

  after(function(done) {
    mongoose.disconnect(done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  it('should exist', function () {
      expect(Project).to.be.a('function');
  });

  describe('Project creation', function() {

    xit('should create a project in the db', function(done){

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
