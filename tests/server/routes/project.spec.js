var dbURI = process.env.NODE_ENV === 'test' ? process.env.dbURI : require('../../../config.js').test.dbURI;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var supertest = require('supertest');
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/project');

var Project = mongoose.model('Project');
var app = require('../../../server/app');
app.startApp(true);

describe('Projects route, /api/projects', function () {

  before(function(done) {
    mongoose.connect(dbURI, done);
  });

  after(function(done) {
    mongoose.disconnect(done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('GET /', function() {

    it('`/` Gets a 200 response with an array', function(done) {
      supertest(app.app)
        .get('/api/projects')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });

  });

  describe('GET /:id', function() {
    var project = {
      name: "my project"
    }; 

    var id;

    beforeEach('write project to db', function(done) {
      Project.create(project)
        .then(function(savedProject) {
          id = savedProject._id;
          done();
        })
        .then(null, done);
    });

    it('`/:id` Gets a 200 response with an array', function(done) {
      supertest(app.app)
        .get('/api/projects/' + id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          expect(res.body.name).to.equal('my project');
          done();
        });
    });

  });

  describe('POST', function() {
    
    it('`/` Gets a 201 response and writes to the db', function(done) {
      var project = {
        name: "my project"
      };  

      supertest(app.app)
        .post('/api/projects')
        .send(project)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an.object;
          done();
        });
    });

  });

  describe('PUT', function() {
    var project = {
      name: "my project"
    }; 
  
    var id;
    var updatedProject;

    beforeEach('write project to db', function(done) {
      Project.create(project)
        .then(function(savedProject) {
          id = savedProject._id;
          project.name = 'your project';
          done();
        })
        .then(null, done);
    });

    it('`/:id` Gets a 201 response and updates to the db', function(done) {
      supertest(app.app)
        .put('/api/projects/' + id)
        .send(project)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('your project');
          done();
        });
    });

  });

  describe('DELETE', function() {
    var project = {
      name: "my project"
    }; 

    var id;

    beforeEach('write project to db', function(done) {
      Project.create(project)
        .then(function(savedProject) {
          id = savedProject._id;
          done();
        })
        .then(null, done);
    });

    it('`/:id` Gets a 201 response and deletes from the db', function(done) {
      supertest(app.app)
        .delete('/api/projects/' + id)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('my project');
          done();
        });
    });    
  });
});
