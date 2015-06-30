var dbURI = process.env.NODE_ENV === 'test' ? process.env.DB_URI : require('../../../config.js').test.dbURI;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/project');
require('../../../server/db/models/document');
require('../../../server/db/models/folder');
require('../../../server/db/models/snapshot');

var Project = mongoose.model('Project');
var Document = mongoose.model('Document');
var Folder = mongoose.model('Folder');
var Snapshot = mongoose.model('Snapshot');

describe('Project model', function () {

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
      expect(Project).to.be.a('function');
  });

  describe('Project creation', function() {

    it('should create a project in the db', function(done){
      var project = {
        name: "my project"
      };

      Project.create(project)
        .then(function(data) {
          Project.findById(data).exec()
            .then(function(data) {
              expect(data).to.be.a('object');
              done();
            })
            .then(null, done);
        });
    });  

    it('should reject a project with no name', function(done) {
      var doc = {
      };

      Project.create(doc)
        .then(null, function(data) {
          expect(data).to.be.instanceOf(Error);
          done();
        });
    });

    it('should generate an access code for a new project', function(done) {
      var project = {
        name: "my project"
      };

      Project.create(project)
        .then(function(data) {
          expect(data.accessCode).to.be.a('string');
          done();
        })
        .then(null, done);
    }); 

  describe('Hooks', function() {
    var id, modifiedDate; 
    beforeEach(function(done) {
      var project = {
        name: "my project"
      };
      Project.create(project).then(function(data) {
        id = data._id;
        modifiedDate = data.modifiedDate;
        done();
      });
    });
  
    it('should update modifiedDate when project is updated', function(done) {
      Project.findOne({_id: id}).then(function(project) {
        project.name = "a project";
        return new Promise(function(resolve, reject) {
          project.save(function(err) {
            if(err) reject(err);
            else {
              resolve();
            }
          });
        });
      }).then(function() {
        return Project.findOne({_id: id})
      }) 
      .then(function(project) {
        expect(project.modifiedDate).to.be.above(modifiedDate); 
        done();
      })
      .then(null, done); 
    });
  });
      
  });

  describe('Methods', function() {
    var proj, snap, doc, folder1, folder2, folder3;  
    beforeEach('Seed database project with 3 nested directories, document, and snapshot', 
                function(done) {
      Snapshot.create({})
      .then(function(_snap) {
        snap = _snap;
        return Document.create({
          name: 'doc',
          snapshots: [snap]
        });
      }).then(function(_doc) {
        doc = _doc;
        return Folder.create({
          name: 'folder3',
          documents: [doc._id]
        });
      }).then(function(_folder3) {
        folder3 = _folder3;
        return Folder.create({
          name: 'folder2',
          folders: [folder3._id],
          documents: [doc._id]
        });
      }).then(function(_folder2) {
        folder2 = _folder2;
        return Folder.create({
          name: 'folder1',
          folders: [folder2._id],
          documents: [doc._id]
        });
      }).then(function(_folder1) {
        folder1 = _folder1;
        return Project.create({
          name: 'proj', 
          rootFolder: folder1._id
        }); 
      }).then(function(_proj) {
        proj = _proj;
        return done(); 
      });
    });

    it('should get all nested objects', function(done) {
      Project.findOne({name: proj.name}).exec().then(function(returnedProj) {
        return returnedProj.getProject(); 
      }).then(function(populatedProject) {
        expect(populatedProject.rootFolder.name).to.equal(folder1.name);
        expect(populatedProject.rootFolder.folders[0].name).to
               .equal(folder2.name);
        expect(populatedProject.rootFolder.folders[0].documents[0]
               .name).to.equal(doc.name);
        expect(populatedProject.rootFolder.folders[0].documents[0]
                .snapshots[0]._id.toString()).to.equal(String(snap._id));
        expect(populatedProject.rootFolder.folders[0].folders[0].documents[0].name).to.equal(doc.name);
        done();
      }).then(null, done);
    });
  });

});
