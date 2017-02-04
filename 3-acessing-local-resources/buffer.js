/**
 * Created by moksha on 04/02/17.
 */
var buffer = new Buffer(8);
var buffer = new Buffer([ 8, 6, 7, 5, 3, 0, 9]);
var buffer = new Buffer("I'm a string!", "utf-8")

var buffer = new Buffer(16);
buffer.write("Hello", "utf-8")
buffer.write(" world!", 5, "utf-8")
buffer.toString('utf-8')
buffer.toString("utf-8", 0, 12)
buffer[12] = buffer[11];
buffer[13] = "1".charCodeAt();
buffer[14] = buffer[13];
buffer[15] = 33
buffer.toString("utf-8")

var snowman = "☃";
snowman.length
Buffer.byteLength(snowman)

var buffer = new Buffer(16)
buffer.write(snowman)
buffer.length

var frosty = new Buffer(24)

var snowman = new Buffer("☃", "utf-8")
frosty.write("Happy birthday! ", "utf-8")
snowman.copy(frosty, 16)
frosty.toString("utf-8", 0, 19)


var puddle = frosty.slice(16, 19)
puddle.toString()
puddle.write("___")
frosty.toString("utf-8", 0, 19)
