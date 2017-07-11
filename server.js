const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

const port = process.env.PORT || 3000;

function send404(response) {
  response.writeHead(404, {'Content-type': 'text/plain'});
  response.write('Error 404: resource not found');
  response.end();
}

function sendPage(response, filePath, fileContents) {
  response.writeHead(200, {'Content-type': mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serverWorking(response, absolutePath) {
  fs.exists(absolutePath, exists => {
    if (exists) {
      fs.readFile(absolutePath, (err, data) => {
        if (err) {
          send404(response);
        } else {
          sendPage(response, absolutePath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

const requestHandler = (request, response) => {
  console.log(request.url);

  let filePath;

  if (request.url === '/') {
    filePath = '/index.html';
  } else {
    filePath = '/' + request.url;
  }

  const absolutePath = './' + filePath;
  serverWorking(response, absolutePath);
};

const server = http.createServer(requestHandler);

server.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
