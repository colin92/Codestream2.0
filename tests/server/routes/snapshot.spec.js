var dbURI = process.env.NODE_ENV === 'test' ? process.env.dbURI : require('../../../config.js').test.dbURI;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var supertest = require('supertest');
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/snapshot');

var Snapshot = mongoose.model('Snapshot');
var app = require('../../../server/app');
app.startApp(true);

describe('Snapshot route, /api/snapshot', function () {
  before(function (done) {
    mongoose.connect(dbURI, done);
  });

  after(function (done) {
    mongoose.disconnect(done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  describe('GET /:id', function() {
    var snapshot = {
      fileContent: "my snapshot",
    }; 
    var id;

    beforeEach('write snapshot to db', function(done) {
      Snapshot.create(snapshot)
        .then(function(savedSnapshot) {
          id = savedSnapshot._id;
          done();
        })
        .then(null, done);
    });

    it('Gets a 200 response with an object', function(done) {
      supertest(app.app)
        .get('/api/snapshot/' + id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.fileContent).to.equal('my snapshot');
          done();
        });
    });

  });

  describe('POST /', function() {
    var snapshot = {
      fileContent: "my snapshot",
    };  

    it('Gets a 201 response and writes to the db', function(done) {

      supertest(app.app)
        .post('/api/snapshot')
        .send(snapshot)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.fileContent).to.equal('my snapshot');
          done();
        });
    });

  });

  describe('PUT /:id', function() {
    var snapshot = {
      fileContent: "my snapshot",
    }; 
  
    var id;

    beforeEach('write snapshot to db', function(done) {
      Snapshot.create(snapshot)
        .then(function(savedSnapshot) {
          id = savedSnapshot._id;
          snapshot.fileContent = 'your snapshot';
          done();
        })
        .then(null, done);
    });

    it('Gets a 201 response and updates to the db', function(done) {
      supertest(app.app)
        .put('/api/snapshot/' + id)
        .send(snapshot)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.fileContent).to.equal('your snapshot');
          done();
        });
    });

  });

  describe('DELETE', function() {
    var snapshot = {
      fileContent: "my snapshot",
    }; 

    var id;

    beforeEach('write snapshot to db', function(done) {
      Snapshot.create(snapshot)
        .then(function(savedSnapshot) {
          id = savedSnapshot._id;
          done();
        })
        .then(null, done);
    });

    it('Gets a 201 response and deletes from the db', function(done) {
      supertest(app.app)
        .delete('/api/snapshot/' + id)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.fileContent).to.equal('my snapshot');
          done();
        });
    });    
  });
});
