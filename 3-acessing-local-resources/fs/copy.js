let fs=require('fs')
let srcFile= process.argv[2]
let destFile= process.argv[3]

let readableStream = fs.createReadStream(srcFile)
let writeableStream = fs.createWriteStream(destFile)
readableStream.pipe(writeableStream);