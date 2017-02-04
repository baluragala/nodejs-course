/**
 * Created by moksha on 04/02/17.
 */
const http = require("http");
const requestHandler1 = function (request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<!DOCTYPE html>");
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Welcome to Node</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("Welcome to Node!");
  response.write("</body>");
  response.write("</html>");
  response.end();
}
const server1 = http.createServer(requestHandler1);

const requestHandler2 = function (request, response) {
  switch (request.url) {
    case '/':
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("<!DOCTYPE html>");
      response.write("<html>");
      response.write("<head>");
      response.write("<title>Welcome to Node</title>");
      response.write("</head>");
      response.write("<body>");
      response.write("Welcome to Node!");
      response.write("</body>");
      response.write("</html>");
      response.end();
      break;
    case '/home':
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("<!DOCTYPE html>");
      response.write("<html>");
      response.write("<head>");
      response.write("<title>Welcome to Node</title>");
      response.write("</head>");
      response.write("<body>");
      response.write("Home Page");
      response.write("</body>");
      response.write("</html>");
      response.end();
      break;
    case '/about':
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("<!DOCTYPE html>");
      response.write("<html>");
      response.write("<head>");
      response.write("<title>Welcome to Node</title>");
      response.write("</head>");
      response.write("<body>");
      response.write("About Page");
      response.write("</body>");
      response.write("</html>");
      response.end();

  }
}

const server2 = http.createServer(requestHandler2);

server1.listen(3000);
console.log("Server1 is listening on 3000" );
server2.listen(3001);
console.log("Server2 is listening on 3001" );