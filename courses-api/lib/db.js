var mongoose = require('mongoose');
var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/courses';

module.exports = function (app) {
  mongoose.connect(mongoUrl, {
    mongoose: {
      safe: true
    }
  }, function (err) {
    if (err) {
      return console.log('Mongoose - connection error:', err);
    }
  });
  mongoose.set('debug', true);
  return mongoose;
};
