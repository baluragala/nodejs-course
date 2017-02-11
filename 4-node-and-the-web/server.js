/**
 * Created by moksha on 05/02/17.
 */
const http = require("http");
const requestHandler1 = function (request, response) {

  console.log(request);
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<!DOCTYPE html>");
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Welcome to Node</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("Welcome to Node - Changed!");
  response.write("</body>");
  response.write("</html>");
  response.end();
};

const server1 = http.createServer(requestHandler1);

server1.listen(8000);