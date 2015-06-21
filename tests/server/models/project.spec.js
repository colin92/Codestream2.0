var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/project');

var Project = mongoose.model('Project');

describe('Project model', function () {

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  it('should exist', function () {
      expect(Project).to.be.a('function');
  });

  describe('Project creation', function() {

    it('should create a project in the db', function(done){
      var project = {
        name: "my project",
        createdDate: Date.now() - 10000000,
        modifiedDate: Date.now()
      };

      Project.create(project)
        .then(function(data) {
          Project.findById(data).exec()
            .then(function(data) {
              expect(data).to.be.a('object');
              done();
            })
            .then(null, done);
        });
    });  

    it('should reject a project with no name', function(done) {
      var doc = {
        createdDate: Date.now() - 10000000,
        modifiedDate: Date.now()
      };

      Project.create(doc)
        .then(null, function(data) {
          expect(data).to.be.instanceOf(Error);
          done();
        });
    }); 
      
  });
});
