/**
 * Created by moksha on 11/02/17.
 */
var express = require('express');
var app = express();

app.use('/user/:id', function(req, res, next) {

    console.log('Request URL:', req.originalUrl);
    console.log(req.params); // debug

    // NOTE : forward request to err route in the middleware
    if(req.params.id.length < 4 ) next('err');

    next();
  }, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
  },
  function (req, res, next) {
    console.log('Request Type:', req.method);
    res.json(req.params)
  });

//error middleware
// NOTE : define error-handling middleware last, after other app.use() and routes calls
// catchall

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(200).send('Exception is caught');
});


var server=app.listen(3000,function(req,res){
  console.log("Catch the action at http://localhost:3000");
});