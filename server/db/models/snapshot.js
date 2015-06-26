//'use strict';
var mongoose = require('mongoose');

var diffSchema = new mongoose.Schema({
  createdDate: {
    type: Date
  },
  diffContent: {
    type: String
  }
});

var snapshotSchema = new mongoose.Schema({
  createdDate: {
    type: Date
  },
  fileContent: {
    type: String
  },
  diffs: [diffSchema]
});


// diffSchema.pre('save', function(next) {
//   this.diffs.order = this.diffs.length;
//   next();
// });

mongoose.model('Snapshot', snapshotSchema);