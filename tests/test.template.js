//  var dbURI = require('../../../config.js').test.dbURI;
//  var clearDB = require('mocha-mongoose')(dbURI);
//
//  var expect = require('chai').expect;
//  var Promise = require('bluebird');
//  var mongoose = require('mongoose');
//
//  require('../../../server/db/models/modelName'); // require models to be tested
//
//  var ModelName = mongoose.model('modelName to be tested');
//
//  describe('model or route being tested', function () {
//
//      before(function(done) {
//      mongoose.connect(dbURI, done);
//    });
//
//    after(function(done) {
//      mongoose.disconnect(done);
//    });
//
//
//    afterEach('Clear test database', function (done) {
//      clearDB(done);
//    });
//
//    it('should exist', function () {
//        expect(User).to.be.a('function');
//    });
//
//    describe('test subcategory', function() {
//
//      it('test 1', function(done){
//
//        User.create({ userName: "" })
//          .then(function(data) {
//            User.findById(data).exec()
//              .then(function(data) {
//                expect(data).to.be.a('object');
//                done();
//              })
//              .then(null, done);
//          });
//      });  
//        
//    });
//  });

