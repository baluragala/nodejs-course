/**
 * Created by moksha on 12/02/17.
 */
const exec = require('child_process').exec;
const child = exec('ps -ef | grep node', (error, stdout, stderr) => {
  if (error) {
    console.error('stderr', stderr);
    throw error;
  }
  console.log('stdout', stdout);
});