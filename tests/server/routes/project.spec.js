var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var supertest = require('supertest');
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db');

var Project = mongoose.model('Project');
var app = require('../../../server/app');
app.startApp(true);

describe('Projects route, /api/projects', function () {
  beforeEach('Establish DB connection', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('GET', function() {

    it('Gets a 200 response with an array', function(done) {
      supertest(app.app)
        .get('/api/projects')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an.array;
          done();
        });
    });

  });

  describe('POST', function() {
    
    it('Gets a 201 response and writes to the db', function(done) {
      var project = {
        name: "my project",
        createdDate: Date.now() - 10000000,
        modifiedDate: Date.now()
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
});
