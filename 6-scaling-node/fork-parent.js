/**
 * Created by moksha on 12/02/17.
 */
const cp = require('child_process');
const n = cp.fork(`${__dirname}/fork-child.js`);
n.on('message', (m) => {
  console.log('PARENT got message:', m);
  n.send({message: 'hello child'});
  //process.exit();
});

