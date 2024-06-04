// create a web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// create a server
const app = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  if (pathname === '/comment') {
    // read the file
    fs.readFile('./comment.html', (err, data) => {
      if (err) {
        return console.log(err);
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
  } else if (pathname === '/comment/save') {
    // save the comment
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      const parsed = querystring.parse(data);
      console.log(parsed);
      res.end('success');
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
});

// run the server
app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});