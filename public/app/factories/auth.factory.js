'use strict';

app.factory('Auth', function($http) {

  var user = null;

  return {
    getUser: function() {
      return user; 
    },
    loggedIn: function() {
      return !!user; 
    },
    login: function() {
      return $http.get('/login').then(function(res) {
        return res.data; 
      });
    },
    logout: function() {
      return $http.get('/logout').then(function(res) {
        user = null;
      }); 
    }
  };  
});
