//'use strict';
var mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
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
  snapshots: {
    type: [mongoose.Schema.ObjectId],
    ref: 'SnapshotSchema'
  }
});

mongoose.model('Folder', documentSchema);
