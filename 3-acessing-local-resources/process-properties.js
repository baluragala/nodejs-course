/**
 * Created by moksha on 03/02/17.
 */
/*// Printing to console
process.stdout.write("Hello World!" + "\n");

// Reading passed parameter
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

// Getting executable path
console.log(process.execPath);

// Platform Information
console.log(process.platform);*/

for (let p of Object.keys(process)) {
  if (typeof process[p] == 'function' && !p.startsWith('_')) {
    console.log(p);
  }
}