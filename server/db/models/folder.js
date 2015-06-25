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

folderSchema.pre('save', function(next) {
  if(!this.createdDate) this.createdDate = Date.now();
  if(this.isModified()) {
    this.modifiedDate = Date.now(); 
  }
  next();
});

mongoose.model('Folder', folderSchema);
