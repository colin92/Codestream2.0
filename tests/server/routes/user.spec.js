// Config setup
var config = process.env.NODE_ENV === 'test' ? process.env : require('../../../config.js').test;
var dbURI = config.dbURI;

// Setup mongoose/promises
var clearDB = require('mocha-mongoose')(dbURI);
var expect = require('chai').expect;
var Promise = require('bluebird');
var mongoose = require('mongoose');
require('../../../server/db/models/users');
var User = mongoose.model('User');

// Start app, initialize superagent
var app = require('../../../server/app');
app.startApp(true);
var request = require('supertest').agent(app.app);

describe('Users route, /api/user', function () {
var cookie=[];

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
      password: 'I live on a pirate ship'
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

  describe('Auth', function() {

    it('`/` fails if user is not admin', function(done) {
        request
        .get('/api/user/')
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
    
    it('`/` fails if user not authenticated', function(done) {
        request.get('/logout').end(function() {
          request
          .get('/api/user/')
          .expect(401)
          .end(function(err, res) {
            if (err) return done(err);
            done();
          });
        });
    });
  });

  describe('GET', function() {
    var user = {
      firstName: "John ",
      lastName: "Smith"
    };  
  
    var id;
    var updatedUser;

    beforeEach('write project to db', function(done) {
      User.create(user)
        .then(function(savedUser) {
          id = savedUser._id;
          user.firstName = 'Jane';
          done();
        })
        .then(null, done);
    });

    it('`/` Gets a 401 response', function(done) {
        request
        .get('/api/user/')
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('`/:id` Gets a 200 for self', function(done) {
        request
        .get('/api/user/' + id)
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('`/:id` Gets a 401 for others', function(done) {
        request
        .get('/api/user/' + selfId)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

  });

  describe('POST', function() {
    
    it('`/` Gets a 401 response', function(done) {
      var user = {
        firstName: "John ",
        lastName: "Smith"
      };  

      request
        .post('/api/user')
        .send(user)
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

  });

  describe('PUT', function() {
    var user = {
      firstName: "John ",
      lastName: "Smith"
    };  
  
    var id;
    var updatedUser;

    beforeEach('write project to db', function(done) {
      User.create(user)
        .then(function(savedUser) {
          id = savedUser._id;
          user.firstName = 'Jane';
          done();
        })
        .then(null, done);
    });

    it('`/:id` Gets a 201 response and updates to the db for self', function(done) {
      request
        .put('/api/user/' + selfId)
        .send({firstName: "Moe"})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.firstName).to.equal("Moe");
          User.findOne({_id: selfId}).exec()
          .then(function(foundUser) {
            expect(foundUser.firstName).to.equal("Moe");
            done();
          });
        });
    });

    it('`/:id` Gets a 401 response for others', function(done) {
      request
        .put('/api/user/' + id)
        .send({firstName: "Moe"})
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

  });

  describe('DELETE', function() {
    var user = {
      firstName: "John ",
      lastName: "Smith"
    };  

    var id;

    beforeEach('write user to db', function(done) {
      User.create(user)
        .then(function(savedUser) {
          id = savedUser._id;
          done();
        })
        .then(null, done);
    });

    it('`/:id` Cannot delete others from the db', function(done) {
      request
        .delete('/api/user/' + id)
        .expect(401)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });    

    it('`/:id` Can delete self from the db', function(done) {
      request
        .delete('/api/user/' + selfId)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.n).to.equal(1);
          User.findOne({ _id: selfId }).exec()
          .then(function(err, result) {
            if(err) return done(err);
            expect(result).to.equal(undefined);
            done();
          })
          .then(null, done);
        });
    });    

  });
});

