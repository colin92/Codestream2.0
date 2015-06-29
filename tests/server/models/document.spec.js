var dbURI = process.env.NODE_ENV === 'test' ? process.env.DB_URI : require('../../../config.js').test.dbURI;
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

    it('should create a document in the db', function(done){
      var doc = {
        name: "my doc",
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
        modifiedDate: Date.now()
      };

      Document.create(doc)
        .then(null, function(data) {
          expect(data).to.be.instanceOf(Error);
          done();
        });
    });     
  });

  describe('Hooks', function() {
    var id, modifiedDate; 
    beforeEach(function(done) {
      var doc = {
        name: "my doc",
        modifiedDate: Date.now()
      };
      Document.create(doc).then(function(data) {
        id = data._id;
        modifiedDate = data.modifiedDate;
        done();
      });
    });
  
    it('should update modifiedDate when project is updated', function(done) {
      Document.findOne({_id: id}).then(function(doc) {
        doc.name = "a project";
        return new Promise(function(resolve, reject) {
          doc.save(function(err) {
            if(err) reject(err);
            else {
              resolve();
            }
          });
        });
      }).then(function() {
        return Document.findOne({_id: id})
      }) 
      .then(function(doc) {
        expect(doc.modifiedDate).to.be.above(modifiedDate); 
        done();
      })
      .then(null, done); 
    });
  });

});
