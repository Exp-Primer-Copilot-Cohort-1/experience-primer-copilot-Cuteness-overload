// create a web server
// require the http module
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

// handle the 404 error
function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found');
  response.end();
}

// handle the file data
function sendFile(response, filePath, fileContents) {
  response.writeHead(200, {'content-type': mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

// check if the file is cached
function serverStatic(response, cache, absPath) {
  if (cache[absPath]) {
    // serve file from memory
    sendFile(response, absPath, cache[absPath]);
  } else {
    // check if the file exists
    fs.exists(absPath, function(exists) {
      if (exists) {
        // read the file from the disk
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          } else {
            // cache the file
            cache[absPath] = data;
            // serve the file read from the disk
            sendFile(response, absPath, data);
          }
        });
      } else {
        // send the 404 response
        send404(response);
      }
    });
  }
}

// create the http server
var server = http.createServer(function(request, response) {
  var filePath = false;
  if (request.url == '/') {
    // set the default file to be served
    filePath = 'public/index.html';
  } else {
    // translate the url path to relative file path
    filePath = 'public' + request.url;
  }
  var absPath = './' + filePath;
  serverStatic(response, cache, absPath);
});

// start the web server
server.listen(3000, function() {
  console.log('Server listening on port 3000');
});

// require the socket.io module
var chatServer = require('./lib/chat_server');
chatServer.listen(server);