//'use strict';
var mongoose = require('mongoose');

var snapshotSchema = new mongoose.Schema({
  createdDate: {
    type: Date
  },
  diffs: {
    type: [mongoose.Schema.ObjectId],
    ref: 'DiffSchema'
  }
});

mongoose.model('Snapshot', snapshotSchema);
