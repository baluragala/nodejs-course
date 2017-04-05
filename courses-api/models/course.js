var mongoose    = require('mongoose');
var generateId  = require('./plugins/generateId');

var courseSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    index: {
      unique: true
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  authors: [{
    type : mongoose.Schema.ObjectId,
    ref : 'Author'
  }]
});

courseSchema.plugin(generateId());

module.exports = mongoose.model('Course', courseSchema);
