/**
 * Created by moksha on 11/02/17.
 */

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose models and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
  name: String,
  password: String,
  admin: Boolean
}));