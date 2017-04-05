/**
 * Created by moksha on 11/02/17.
 */
var express = require('express');
var app = express();

//debug middleware - print params for all requests
// NOTE : routeless


app.use(function (req, res, next) {
  console.log('Request Received @ :' + Date());
  //res.end('DONE');
  next();// without this - request goes into EVL trap - endless
});


app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl);
  console.log(req.params); // debug
  // NOTE : forward request to next route in the middleware
  if (req.params.length > 0) next('route');
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
  //res.send('Message from server');
  /*
   Documentation from nodejs:
   Ends the response process. This method actually comes from Node core,0
   specifically the response.end() method of http.ServerResponse.

   Use to quickly end the response without any data.
   If you need to respond with data, instead use methods such as res.send() and res.json().
   */
  //res.end('Message from server');
  //res.json({instructor:'baluragla', course:'Mastering Nodejs'})
});

app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl);
  console.log('Second Matching Url'); // debug
  next();
  //res.json({instructor:'baluragla', course:'Mastering Nodejs'})
});


var server = app.listen(3000, function (req, res) {
  console.log("Catch the action at http://localhost:3000");
});