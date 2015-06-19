var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/folder');

var Folder = mongoose.model('Folder');

describe('Folder model', function () {
  beforeEach('Connect to db', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  it('should exist', function () {
      expect(Folder).to.be.a('function');
  });

  describe('Folder creation', function() {

    xit('should create a folder in the db', function(done){

      Folder.create({})
        .then(function(data) {
          Folder.findById(data).exec()
            .then(function(data) {
              expect(data).to.be.a('object');
              done();
            })
            .then(null, done);
        });
    });  
      
  });
});