// create a web server
// When a user visits the root route '/', have it render a view with an h1 that says "Welcome to my dojo!"
// When a user visits any other route, have it render a view with an h1 that says "404 Not Found"
// If the user visits the root route, have it also render a view with an image of a dojo
// If the user visits any other route, have it also render a view with an image of Yoda
// If the user visits the root route, have it also render a view with a form that submits to a POST route
// If the user visits any other route, have it also render a view with a form that submits to a POST route
// When the form is submitted, have it POST to a route called "/result"
// The server should only be listening on localhost:8000

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response) {
  console.log('client request URL: ', request.url);

  if (request.url === '/') {
    fs.readFile('index.html', 'utf8', function(errors, contents) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(contents);
      response.end();
    });
  } else if (request.url === '/dojo.html') {
    fs.readFile('dojo.html', 'utf8', function(errors, contents) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(contents);
      response.end();
    });
  } else if (request.url === '/stylesheet/style.css') {
    fs.readFile('stylesheet/style.css', 'utf8', function(errors, contents) {
      response.writeHead(200, {'Content-Type': 'text/css'});
      response.write(contents);
      response.end();
    });
  } else if (request.url === '/images/dojo.jpg') {
    fs.readFile('images/dojo.jpg', function(errors, contents) {
      response.writeHead(200, {'Content-Type': 'image/jpg'});
      response.write(contents);
      response.end();
    });
  } else if (request.url === '/images/yoda.jpg') {
    fs.readFile('images/yoda.jpg', function(errors, contents) {
      response.writeHead(200, {'Content-Type': 'image/jpg'});
      response.write(contents);
      response.end();
    });
  } else {
    response.writeHead(404);
    response.end
