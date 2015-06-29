var dbURI = process.env.NODE_ENV === 'test' ? process.env.dbURI : require('../../../config.js').test.dbURI;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var supertest = require('supertest');
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/document');

var Document = mongoose.model('Document');
var app = require('../../../server/app');
app.startApp(true);

describe('Document route, /api/document', function () {
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
    var document = {
      name: "my document",
      modifiedDate: Date.now()
    }; 
    var id;

    beforeEach('write document to db', function(done) {
      Document.create(document)
        .then(function(savedDocument) {
          id = savedDocument._id;
          done();
        })
        .then(null, done);
    });

    it('Gets a 200 response with an object', function(done) {
      supertest(app.app)
        .get('/api/document/' + id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('my document');
          done();
        });
    });

  });

  describe('POST /', function() {
    var folder = {
      name: "my document",
      modifiedDate: Date.now()
    };  

    it('Gets a 201 response and writes to the db', function(done) {

      supertest(app.app)
        .post('/api/document')
        .send(folder)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('my document');
          done();
        });
    });

  });

  describe('PUT /:id', function() {
    var document = {
      name: "my document",
      modifiedDate: Date.now()
    }; 
  
    var id;

    beforeEach('write document to db', function(done) {
      Document.create(document)
        .then(function(savedDocument) {
          id = savedDocument._id;
          document.name = 'your document';
          done();
        })
        .then(null, done);
    });

    it('Gets a 201 response and updates to the db', function(done) {
      supertest(app.app)
        .put('/api/document/' + id)
        .send(document)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('your document');
          done();
        });
    });

  });

  describe('DELETE', function() {
    var document = {
      name: "my document",
      modifiedDate: Date.now()
    };

    var id;

    beforeEach('write document to db', function(done) {
      Document.create(document)
        .then(function(savedDocument) {
          id = savedDocument._id;
          done();
        })
        .then(null, done);
    });

    it('Gets a 201 response and deletes from the db', function(done) {
      supertest(app.app)
        .delete('/api/document/' + id)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('my document');
          done();
        });
    });    
  });
});
