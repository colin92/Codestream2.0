//'use strict';
var mongoose = require('mongoose');

var diffSchema = new mongoose.Schema({
  createdDate: {
    type: Date
  }
});

var snapshotSchema = new mongoose.Schema({
  createdDate: {
    type: Date
  },
  diffs: [diffSchema]
});


// diffSchema.pre('save', function(next) {
//   this.diffs.order = this.diffs.length;
//   next();
// });

mongoose.model('Snapshot', snapshotSchema);