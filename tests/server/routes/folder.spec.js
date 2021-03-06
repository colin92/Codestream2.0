var dbURI = process.env.NODE_ENV === 'test' ? process.env.dbURI : require('../../../config.js').test.dbURI;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var supertest = require('supertest');
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/folder');

var Folder = mongoose.model('Folder');
var app = require('../../../server/app');
app.startApp(true);

describe('Folder route, /api/folder', function () {
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
    var folder = {
      name: "my folder"
    }; 
    var id;

    beforeEach('write folder to db', function(done) {
      Folder.create(folder)
        .then(function(savedFolder) {
          id = savedFolder._id;
          done();
        })
        .then(null, done);
    });

    it('Gets a 200 response with an object', function(done) {
      supertest(app.app)
        .get('/api/folder/' + id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('my folder');
          done();
        });
    });

  });

  describe('POST /', function() {
    var folder = {
      name: "my folder"
    };  

    it('Gets a 201 response and writes to the db', function(done) {

      supertest(app.app)
        .post('/api/folder')
        .send(folder)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('my folder');
          done();
        });
    });

  });

  describe('PUT /:id', function() {
    var folder = {
      name: "my folder"
    }; 
  
    var id;

    beforeEach('write folder to db', function(done) {
      Folder.create(folder)
        .then(function(savedFolder) {
          id = savedFolder._id;
          folder.name = 'your folder';
          done();
        })
        .then(null, done);
    });

    it('Gets a 201 response and updates to the db', function(done) {
      supertest(app.app)
        .put('/api/folder/' + id)
        .send(folder)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('your folder');
          done();
        });
    });

  });

  describe('DELETE', function() {
    var folder = {
      name: "my folder"
    };

    var id;

    beforeEach('write folder to db', function(done) {
      Folder.create(folder)
        .then(function(savedFolder) {
          id = savedFolder._id;
          done();
        })
        .then(null, done);
    });

    it('Gets a 201 response and deletes from the db', function(done) {
      supertest(app.app)
        .delete('/api/folder/' + id)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('my folder');
          done();
        });
    });    
  });
});
