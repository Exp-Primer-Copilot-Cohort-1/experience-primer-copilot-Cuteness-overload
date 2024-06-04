// create a web server
var http = require('http');

// create a server object
var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Hello World!');
  res.end();
});

// listen on port 3000
server.listen(3000, function() {
  console.log('Server is listening on port 3000');
  return 0;
});
