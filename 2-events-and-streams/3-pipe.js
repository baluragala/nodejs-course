/**
 * Created by moksha on 04/02/17.
 */
const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('1-events.js')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('events.zip'));
