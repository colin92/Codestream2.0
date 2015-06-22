var dbURI = require('../../../config.js').test.dbURI;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/document');

var Document = mongoose.model('Document');

describe('Document model', function () {

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
      expect(Document).to.be.a('function');
  });

  describe('Document creation', function() {

    xit('should create a document in the db', function(done){

      Document.create({})
        .then(function(data) {
          Document.findById(data).exec()
            .then(function(data) {
              expect(data).to.be.a('object');
              done();
            })
            .then(null, done);
        });
    });  
      
  });
});
