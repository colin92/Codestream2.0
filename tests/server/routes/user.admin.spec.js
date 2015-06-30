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

describe('Admin users route, /api/user', function () {
var cookie=[];

  before(function(done) {
    mongoose.connect(dbURI, done);
  });

  after(function(done) {
    mongoose.disconnect(done);
  });
  
  // Necessary beforeEach and afterEach for authentication
  beforeEach('Create Session', function(done) {
    User.create({
      firstName: 'John',
      lastName: 'Doe',
      password: 'I live on a pirate ship',
      admin: true
    }).then(function(user) {
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

    it('`/` succeeds if admin authenticated', function(done) {
        request
        .get('/api/user/')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
    
    it('`/` fails if admin is not authenticated', function(done) {
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

    it('`/` Gets a 200 response with an array', function(done) {
        request
        .get('/api/user/')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an('array');
          done();
        });
    });

  });

  describe('POST', function() {
    
    it('`/` Gets a 201 response and writes to the db', function(done) {
      var user = {
        firstName: "John ",
        lastName: "Smith"
      };  

      request
        .post('/api/user')
        .send(user)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an("object");
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

    it('`/:id` Gets a 201 response and updates to the db', function(done) {
      request
        .put('/api/user/' + id)
        .send(user)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.firstName).to.equal(user.firstName);
          User.findOne({_id: id}).exec()
          .then(function(foundUser) {
            expect(foundUser.firstName).to.equal(user.firstName);
            done();
          });
        });
    });

  });

  describe('DELETE', function() {
    var user = {
      firstName: "John ",
      lastName: "Smith"
    };  

    var id;

    beforeEach('write project to db', function(done) {
      User.create(user)
        .then(function(savedUser) {
          id = savedUser._id;
          done();
        })
        .then(null, done);
    });

    it('`/:id` Gets a 201 response and deletes from the db', function(done) {
      request
        .delete('/api/user/' + id)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body.n).to.equal(1);
          User.findOne({ _id: id }).exec()
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

