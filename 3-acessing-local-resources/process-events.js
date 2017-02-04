/**
 * Created by moksha on 03/02/17.
 */
console.log('I am node');
process.on('beforeExit', function (e) {
  console.log(e);
  console.log('beforeExit');
  /*setTimeout(function () {
    console.log(new Date());
  })*/
});

process.on('exit',function (e) {
  console.log(e);
  console.log('exit');
  throw new Error('Uncaught');
});


process.on('uncaughtException',function (e) {
  console.log(e);
  console.log('uncaughtException');
});
