/**
 * Created by moksha on 01/02/17.
 */
const fs = require('fs');
let data;
console.log('1. Before file read');
try {
  data = fs.readFileSync('data.txt', 'utf-8');
} catch (e) {
  console.log(e)
}
console.log('2 FILEDATA : ' + data);
console.log('3. After file read');