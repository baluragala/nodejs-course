/**
 * Created by moksha on 12/02/17.
 */
process.on('message', (m) => {
  console.log('CHILD got message:', m);
});
process.send({message: 'hello parent'});