var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/document');

var Document = mongoose.model('Document');

describe('Document model', function () {
  beforeEach('Connect to db', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  it('should exist', function () {
      expect(Document).to.be.a('function');
  });

  describe('Document creation', function() {

    it('should create a document in the db', function(done){
      var doc = {
        name: "my doc",
        createdDate: Date.now() - 10000000,
        modifiedDate: Date.now()
      };

      Document.create(doc)
        .then(function(data) {
          Document.findById(data).exec()
            .then(function(data) {
              //console.log(data);
              expect(data).to.be.a('object');
              done();
            })
            .then(null, done);
        });
    }); 

    it('should reject a document with no name', function(done) {
      var doc = {
        createdDate: Date.now() - 10000000,
        modifiedDate: Date.now()
      };

      Document.create(doc)
        .then(null, function(data) {
          expect(data).to.be.instanceOf(Error);
          done();
        });
    });     
  });
});