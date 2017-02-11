var fs = require("fs");

function readData(err, data) {
      console.log(data);
}

fs.readFile('Zeolearn.txt', 'utf8', readData);
