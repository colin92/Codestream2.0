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

mongoose.model('Project', projectSchema);
