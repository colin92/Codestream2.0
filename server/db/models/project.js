//'use strict';
var mongoose = require('mongoose');
var Promise = require('bluebird');

var projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date
  },
  modifiedDate: {
    type: Date
  },
  accessCode: {
    type: String
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rootFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder'
  }
});

var generateAccessCode = function() {
  return Date.now().toString(36);
};

var getFoldersAndDocuments = function getFoldersAndDocuments(rootFolder) {
  var docs, snaps, folds;
  var jsonRootFolder = rootFolder.toJSON ? rootFolder.toJSON() : rootFolder;
  // First, get all documents in current folder
  return mongoose.model('Document').find({_id: { $in: rootFolder.documents } })
  .exec()
  .then(function(documents) {
    // Attach documents to json version of folder
    docs = documents;
    jsonRootFolder.documents = documents;
    // Then get all snapshots from those documents
    return Promise.all(documents.map(function(doc) {
      return mongoose.model('Snapshot').find({_id: { $in: doc.snapshots } }).exec();
    }));
  })
  .then(function(snapshots) {
    // Attach snapshots to json version of documents
    jsonRootFolder.documents = jsonRootFolder.documents.map(function(doc, i) {
      doc = doc.toJSON();
      doc.snapshots = snapshots[i];
      return doc;
    });
    if(rootFolder.folders && rootFolder.folders.length > 0) {
      // If there are folders within this folder, find them
      return mongoose.model('Folder').find({_id: { $in: rootFolder.folders }})
      .exec();
    }
  })
  .then(function(folders) {
    // Take the found folders and recursively call getFoldersAndDocuments() 
    if(folders && folders.length) return Promise.all(folders.map(getFoldersAndDocuments));
    else return folders; // Otherwise, return the empty array of folders
  })
  .then(function(folders) {
    // Attach nested folders (populated with the recursive call) back to
    // the json object of the current folder
    jsonRootFolder.folders = folders;
    return jsonRootFolder; // return populated folder
  });
};

projectSchema.methods.getProject = function getProject() {
  var proj;
  // Get rootFolder
  return this.populate('rootFolder').execPopulate().then(function(_proj) {
    proj = _proj.toJSON();
    // recursively populate with getFoldersAndDocuments()
    return getFoldersAndDocuments(proj.rootFolder).then(function(rootF) {
      // Attach populated folder back to project, return project
      proj.rootFolder = rootF; 
      return proj;
    }); 
  });
};

projectSchema.statics.generateAccessCode = generateAccessCode;

projectSchema.pre('save', function(next) {
  this.accessCode = this.constructor.generateAccessCode();
  
  if(!this.createdDate) this.createdDate = Date.now();
  
  if(this.isModified()) {
    this.modifiedDate = Date.now(); 
  }
  next();
});

mongoose.model('Project', projectSchema);
