/**
 * Created by moksha on 01/02/17.
 */
/**
 * Created by moksha on 01/02/17.
 */
const fs = require('fs');
console.log('1. Before file read');
try {
  data = fs.readFile('data.txt', 'utf-8', function (err, content) {
    console.log('2 FILEDATA : ' + content.toUpperCase());
    console.log('3. After file read');
  });
} catch (e) {
  console.log(e)
}



