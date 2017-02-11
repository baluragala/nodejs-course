const fs=require('fs');
var dirName=process.argv[2]
fs.mkdir(dirName, function(err,data){
  console.log(data)
})
