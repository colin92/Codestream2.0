var dbURI = process.env.NODE_ENV === 'test' ? process.env.DB_URI : require('../../../config.js').test.dbURI;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/folder');

var Folder = mongoose.model('Folder');

describe('Folder model', function () {

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
      expect(Folder).to.be.a('function');
  });

  describe('Folder creation', function() {

    it('should create a folder in the db', function(done){
      var doc = {
        name: "my folder",
        createdDate: Date.now() - 10000000,
        modifiedDate: Date.now()
      };

      Folder.create(doc)
        .then(function(data) {
          Folder.findById(data).exec()
            .then(function(data) {
              expect(data).to.be.a('object');
              done();
            })
            .then(null, done);
        });
    });  

    it('should reject a folder with no name', function(done) {
      var folder = {
        createdDate: Date.now() - 10000000,
        modifiedDate: Date.now()
      };

      Folder.create(folder)
        .then(null, function(data) {
          expect(data).to.be.instanceOf(Error);
          done();
        });
    }); 
      
  });

  describe('Hooks', function() {
    var id, modifiedDate; 
    beforeEach(function(done) {
      var folder = {
        name: "my folder",
        createdDate: Date.now() - 10000000,
        modifiedDate: Date.now()
      };
      Folder.create(folder).then(function(data) {
        id = data._id;
        modifiedDate = data.modifiedDate;
        done();
      });
    });
  
    it('should update modifiedDate when project is updated', function(done) {
      Folder.findOne({_id: id}).then(function(folder) {
        folder.name = "a project";
        return new Promise(function(resolve, reject) {
          folder.save(function(err) {
            if(err) reject(err);
            else {
              resolve();
            }
          });
        });
      }).then(function() {
        return Folder.findOne({_id: id})
      }) 
      .then(function(folder) {
        expect(folder.modifiedDate).to.be.above(modifiedDate); 
        done();
      })
      .then(null, done); 
    });
  });

});
