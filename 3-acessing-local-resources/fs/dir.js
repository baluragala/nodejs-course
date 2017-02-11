var fs = require('fs');

if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " path/to/directory");
    process.exit(-1);
}

var path = process.argv[2];
fs.readdir(path, function(err, items) {
    items.forEach((item) => console.log(item))
});


/*
var items = fs.readdirSync(path)
items.forEach((item) => console.log(item))
*/
