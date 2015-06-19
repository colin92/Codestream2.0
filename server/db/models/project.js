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
  users: {
    type: [Schema.ObjectId]
  },
  owner: {
    type: Schema.ObjectId
  },
  accessCode: {
    type: String
  },
  rootFolder: {
    type: Schema.ObjectId
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
