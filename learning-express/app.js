/**
 * Created by moksha on 05/02/17.
 */
const Express = require('express');
const app = new Express();

//routes -> address

let count = 0;
let tasks = [];


app.get('/', function (req, res, next) {
  //res.json({message: 'Hello Express - one '});
  next();
});

app.get('/', function (req, res) {
  res.json({message: 'Hello Express - two'});
});


app.post('/', function (req, res) {
  res.json({message: 'Hello Express - from post'});
});

app.get('/tasks', function (req, res) {
  res.json(tasks);
});

app.get('/tasks/:id', function (req, res) {
  console.log(req.params);
  let task = tasks.filter(function (t) {
    return t.id == req.params.id;
  })
  res.json(task);
});

app.get('/tasks/:id/user/:userId', function (req, res) {
  let task = tasks.filter(function (t) {
    return t.id == req.params.id;
  })
  res.json(task);
});


app.post('/tasks', function (req, res) {
  tasks.push(
    {
      id: count,
      title: 'Task ' + count,
      status: 'OPEN',
      created: new Date()
    }
  );

  res.json({
    title: 'Task ' + count,
    status: 'OPEN',
    created: new Date()
  })
  count++;
});


app.listen(3000, function (req, res) {
  console.log('Server is running on port 3000');
});