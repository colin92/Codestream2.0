var dbURI = process.env.NODE_ENV === 'test' ? process.env.dbURI : require('../../../config.js').test.dbURI;
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var supertest = require('supertest');
var Promise = require('bluebird');
var mongoose = require('mongoose');

require('../../../server/db/models/project');
require('../../../server/db/models/document');
require('../../../server/db/models/folder');
require('../../../server/db/models/snapshot');
require('../../../server/db/models/users');

var Project = mongoose.model('Project');
var Document = mongoose.model('Document');
var Folder = mongoose.model('Folder');
var Snapshot = mongoose.model('Snapshot');
var User = mongoose.model('User');

var app = require('../../../server/app');
app.startApp(true);
var request = require('supertest').agent(app.app);

describe('Projects route, /api/projects', function () {

  before(function(done) {
    mongoose.connect(dbURI, done);
  });

  after(function(done) {
    mongoose.disconnect(done);
  });

  // Necessary beforeEach and afterEach for authentication
  var selfId;
  beforeEach('Create Session', function(done) {
    User.create({
      firstName: 'John',
      lastName: 'Doe',
      password: 'I live on a pirate ship',
    }).then(function(user) {
      selfId = user._id;
      request
      .post('/auth/login')
      .send({username: 'John', password: 'I live on a pirate ship'})
      .end(function(err, res) {
        request.saveCookies(res);
        done();
      });
    });
  });

  afterEach('Kill session', function (done) {
    request.get('/logout').end(function(err, res) {
      done();
    });
  });

  afterEach('Clear test database', function (done) {
    clearDB(done);
  });


  describe('GET', function() {
    var proj, snap, doc, folder1, folder2, folder3;  
    var id;

    beforeEach('write project to db', function(done) {
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
          rootFolder: folder1._id,
          owner: selfId
        }); 
      }).then(function(_proj) {
        proj = _proj;
        id = proj._id;
        return done(); 
      });
    });

    it('`/` Rejects a get all with 401', function(done) {
      request
        .get('/api/projects')
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('`/:id` Gets a 200 response with an array', function(done) {
      request
        .get('/api/projects/' + id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          var populatedProject = res.body;
          expect(populatedProject.rootFolder.name).to.equal(folder1.name);
          expect(populatedProject.rootFolder.folders[0].name).to.equal(folder2.name);
          expect(populatedProject.rootFolder.folders[0].documents[0].name).to.equal(doc.name);
          expect(populatedProject.rootFolder.folders[0].documents[0].snapshots[0]._id.toString()).to.equal(String(snap._id));
          expect(populatedProject.rootFolder.folders[0].folders[0].documents[0].name).to.equal(doc.name);
          done();
        });
    });

  });

  describe('POST', function() {
    
    it('`/` Gets a 201 response and writes to the db', function(done) {
      var project = {
        name: "my project"
      };  

      request
        .post('/api/projects')
        .send(project)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an("object");
          done();
        });
    });

  });

  describe('PUT', function() {
    var project = {
      name: "your project",
    }; 
  
    var id;
    var updatedProject;

    beforeEach('write project to db', function(done) {
      Project.create({name: "my project", owner: selfId})
        .then(function(savedProject) {
          id = savedProject._id;
          project.name = 'your project';
          done();
        })
        .then(null, done);
    });

    it('`/:id` Gets a 201 response and updates to the db', function(done) {
      request
        .put('/api/projects/' + id)
        .send(project)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('your project');
          done();
        });
    });

  });

  describe('DELETE', function() {
    var project = {
      name: "my project"
    }; 

    var id;

    beforeEach('write project to db', function(done) {
      Project.create(project)
        .then(function(savedProject) {
          id = savedProject._id;
          done();
        })
        .then(null, done);
    });

    it('`/:id` Gets a 201 response and deletes from the db', function(done) {
      request
        .delete('/api/projects/' + id)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.name).to.equal('my project');
          done();
        });
    });    
  });
});
