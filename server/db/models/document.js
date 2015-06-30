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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Snapshot'
  }
});

documentSchema.pre('save', function(next) {
  if(!this.createdDate) this.createdDate = Date.now();
  if(this.isModified()) {
    this.modifiedDate = Date.now(); 
  }
  next();
});

mongoose.model('Document', documentSchema);
