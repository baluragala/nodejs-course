/**
 * Created by moksha on 04/02/17.
 */
const Express = require('express');
const path = require('path');
const App = new Express();
const PORT = process.env.PORT || 8080;

App.use(Express.static('public'));

App.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'index.html'));
});

App.get('/tasks', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'tasks.html'));
});

App.get('/add-task', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'add-task.html'));
});

App.get('/task-detail/:id', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'task-detail.html'));
});

App.listen(PORT, function (req, res) {
  console.log(`server is up and running at http://localhost:${PORT}`);
});