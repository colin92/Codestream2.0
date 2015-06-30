'use strict';

xdescribe('Auth Factory', function() {
  var Auth, $httpBackend;

  beforeEach(module('Meaniscule'));

  beforeEach(inject(function(_Auth_, _$httpBackend_) {
    Auth = _Auth_;   
    $httpBackend = _$httpBackend_;
  }));

  describe('#getUser', function() {

    it('should get logged in user as null if not logged in', function() {
      expect(Auth.getUser()).to.equal(null);
    });

    it('should get logged in user as null if not logged in', function() {
      expect(Auth.getUser()).to.equal(null);
    });

  });

  describe('#login', function() {

    it('should hit the correct route', function(done) {
      Auth.login().then(function() {
        $httpBackend.expect('GET', '/login').respond(200);
        done()
      });
    });

    it('should', function() {
      expect(Auth.getUser()).to.equal(null);
    });

  });
});

