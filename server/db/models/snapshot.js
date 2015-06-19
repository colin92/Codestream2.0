//'use strict';
var mongoose = require('mongoose');

var diffSchema = new mongoose.Schema({
  createdDate: {
    type: Date
  },
  order: Number
});

var snapshotSchema = new mongoose.Schema({
  createdDate: {
    type: Date
  },
  diffs: [diffSchema]
});


mongoose.model('Snapshot', snapshotSchema);
