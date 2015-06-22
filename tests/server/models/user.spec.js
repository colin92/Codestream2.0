var dbURI = 'mongodb://localhost:27017/codestream-test';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/users');

var User = mongoose.model('User');

describe('User model', function () {

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });

  it('should exist', function () {
      expect(User).to.be.a('function');
  });

  describe('User creation', function() {

    it('should create a user in the db', function(done){

      User.create({ userName: "" })
        .then(function(data) {
          User.findById(data).exec()
            .then(function(data) {
              expect(data).to.be.a('object');
              done();
            })
            .then(null, done);
        })
        .then(null, done);
    });  
      
  });
});
