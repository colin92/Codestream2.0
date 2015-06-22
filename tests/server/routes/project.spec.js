var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var supertest = require('supertest');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var Project = mongoose.model('Project');
var app = require('../../../server/app');
app.startApp(true);

describe('Projects route', function () {

  before(function(done) {
    mongoose.connect(dbURI, done);
  });

  after(function(done) {
    mongoose.disconnect(done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('GET /api/projects/', function() {
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
});
