var dbURI = process.env.NODE_ENV === 'test' ? process.env.DB_URI : require('../../../config.js').test.dbURI;
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

    it('should create a project in the db', function(done){
      var project = {
        name: "my project"
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
      };

      Project.create(doc)
        .then(null, function(data) {
          expect(data).to.be.instanceOf(Error);
          done();
        });
    });

    it('should generate an access code for a new project', function(done) {
      var project = {
        name: "my project"
      };

      Project.create(project)
        .then(function(data) {
          expect(data.accessCode).to.be.a('string');
          done();
        })
        .then(null, done);
    }); 

  describe('Hooks', function() {
    var id, modifiedDate; 
    beforeEach(function(done) {
      var project = {
        name: "my project"
      };
      Project.create(project).then(function(data) {
        id = data._id;
        modifiedDate = data.modifiedDate;
        done();
      });
    });
  
    it('should update modifiedDate when project is updated', function(done) {
      Project.findOne({_id: id}).then(function(project) {
        project.name = "a project";
        return new Promise(function(resolve, reject) {
          project.save(function(err) {
            if(err) reject(err);
            else {
              resolve();
            }
          });
        });
      }).then(function() {
        return Project.findOne({_id: id})
      }) 
      .then(function(project) {
        expect(project.modifiedDate).to.be.above(modifiedDate); 
        done();
      })
      .then(null, done); 
    });
  });
      
  });
});
