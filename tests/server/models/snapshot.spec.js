var dbURI = 'mongodb://localhost:27017/meaniscule-app-tests';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/snapshot');

var Snapshot = mongoose.model('Snapshot');

describe('Snapshot model', function () {
  beforeEach('Connect to db', function (done) {
    if (mongoose.connection.db) return done();
    mongoose.connect(dbURI, done);
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  it('should exist', function () {
      expect(Snapshot).to.be.a('function');
  });

  describe('Snapshot creation', function() {
    it('should create a snapshot in the db', function(done){
      var snapshot = {
        createdDate: Date.now() - 10000000,
      };

      Snapshot.create(snapshot)
        .then(function(data) {
          Snapshot.findById(data).exec()
            .then(function(data) {
              expect(data).to.be.a('object');
              done();
            })
            .then(null, done);
        })
        .then(null, done);
    });      
  });

  describe('Diff creation', function() {
    it('should create a diff in the db', function(done) {
      var snapshot = {
        createdDate: Date.now() - 10000000,
        diffs: []
      };

      var diff = {
        createdDate: Date.now() - 10000000,
        diffContent: "diff content"        
      };

      snapshot.diffs[0] = diff;

      Snapshot.create(snapshot)
        .then(function(data) {
          Snapshot.findById(data).exec()
            .then(function(data) {
              expect(data.diffs.length).to.equal(1);
              done();
            })
            .then(null, done);
        })
        .then(null, done);

    });
  });
});