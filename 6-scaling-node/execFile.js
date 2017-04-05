/**
 * Created by moksha on 12/02/17.
 */
const execFile = require('child_process').execFile;
const child = execFile('ls', ['-ll'], (error, stdout, stderr) => {
  if (error) {
    console.error('stderr', stderr);
    throw error;
  }
  console.log(stdout);
});