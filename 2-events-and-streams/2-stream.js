/**
 * Created by moksha on 04/02/17.
 */
let fs = require('fs');
let readableStream = fs.createReadStream('events.js');
let writeableStream = fs.createWriteStream('events-copy.js');
let content = '';

let counter = 0;

/*readableStream.on('readable', function () {
  while ((chunk = readableStream.read()) != null)
    content += chunk;
  counter++
});*/


readableStream.on('data', function () {
  while ((chunk = readableStream.read()) != null)
    content += chunk;
  counter++
});

readableStream.on('error', function (error) {
  console.log('Error occurred', error)
});

readableStream.on('end', function (chunk) {
  console.log('reads chunks', counter);
});

readableStream.pipe(writeableStream);
