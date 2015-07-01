var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var mongoose = require('mongoose');
var startDb = require('./server/db');
var chalk = require('chalk');

var User = mongoose.model('User');
var Project = mongoose.model('Project');
var Folder = mongoose.model('Folder');
var Document = mongoose.model('Document');

startDb.then(function() {
  var users = [
    { firstName: 'Colin', lastName: 'Meret', password: 'cheese' },
    { firstName: 'Ash', lastName: 'Ryan', password: 'cheese' }
  ];

  var documents = [
    (new Document({name: 'doc1'})),
    (new Document({name: 'doc2'})),
    (new Document({name: 'doc3'})),
    (new Document({name: 'doc4'}))
  ];

  var folders = [
    (new Folder({name: 'folder1'})),
    (new Folder({name: 'folder2'})),
    (new Folder({name: 'folder3'})),
    (new Folder({name: 'folder4'}))
  ];

  folders[0].folders = [folders[2]];
  folders[0].documents = [documents[0]];
  folders[1].folders = [folders[3]];
  folders[1].documents = [documents[1]];
  folders[2].documents = [documents[2]];
  folders[3].documents = [documents[3]];

  var projects = [
    { name: 'test project', rootFolder: folders[0]},
    { name: 'second test project', rootFolder: folders[1]}
  ];

  Promise.all(users.map(function(user) {
    return User.create(user);
  }))
  .then(function() {
    return Promise.all(projects.map(function(project) {
      return Project.create(project); 
    })); 
  })
  .then(function() {
    return Promise.all(folders.map(function(folder) {
        return folder.save();
    })); 
  })
  .then(function() {
    return Promise.all(documents.map(function(doc) {
        return doc.save();
    })); 
  })
  .then(function() {
    console.log('seed completed'); 
  });

});
