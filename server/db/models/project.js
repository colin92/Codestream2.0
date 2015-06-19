//'use strict';
var mongoose = require('mongoose');

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
    type: [mongoose.Schema.ObjectId],
    ref: 'UserSchema'
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'UserSchema'
  },
  rootFolder: {
    type: mongoose.Schema.ObjectId,
    ref: 'FolderSchema'
  }
});

var generateAccessCode = function() {
  return Date.now().toString(36);
};

projectSchema.statics.generateAccessCode = generateAccessCode;

projectSchema.pre('save', function(next) {
  this.accessCode = this.constructor.generateAccessCode();
  next();
});

mongoose.model('Project', projectSchema);
