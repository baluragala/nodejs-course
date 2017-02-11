/**
 * Created by moksha on 04/02/17.
 */
let fs = require('fs');
let readableStream = fs.createReadStream('1-events.js');
let writeableStream = fs.createWriteStream('1-events-copy.js');
let content = '';

let counter = 0;

/*readableStream.on('readable', function () {
  while ((chunk = readableStream.read()) != null)
    if (chunk)
      writeableStream.write(chunk);
  //content += chunk;
  counter++
});


/!*readableStream.on('data', function () {
 while ((chunk = readableStream.read()) != null)
 content += chunk;
 counter++
 });*!/

readableStream.on('error', function (error) {
  console.log('Error occurred', error)
});

readableStream.on('end', function (chunk) {
  console.log('reads chunks', counter);
  console.log(content);

});*/

readableStream.pipe(writeableStream);
