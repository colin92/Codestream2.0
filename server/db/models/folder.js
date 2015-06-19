//'use strict';
var mongoose = require('mongoose');

var folderSchema = new mongoose.Schema({
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
  documents: {
    type: [mongoose.Schema.ObjectId],
    ref: 'DocumentSchema'
  },
  folders: {
    type: [mongoose.Schema.ObjectId],
    ref: 'FolderSchema'
  }
});

mongoose.model('Folder', folderSchema);
